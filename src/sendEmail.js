import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';
import { getCurrentWeek } from './const';
import { upsertNotification, NotificationDoc } from './database/notification';

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
const timesheet = database.collection("timesheet");
const students = database.collection("student");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to send email
export const sendEmail = ({ to = "youjiayu99@gmail.com", subject, text, html }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

// Fetch drafts and send reminder emails
export async function sendDraftReminders() {
  try {
    await client.connect();
    console.log("Connected to MongoDB server successfully.");
    console.log("Fetching current week...");

    const currentWeek = await getCurrentWeek(); // Await the promise
    console.log("Current week:", currentWeek);
    
    const studentList = await students.find({}).toArray();
    console.log("Fetched student list:", studentList);
    
    const weekQuery = { week: `Week ${currentWeek}` };
    const documents = await timesheet.find(weekQuery).toArray();
    console.log("Fetched timesheet documents:", documents);

    const studentDocuments = new Map(
      documents.map((doc) => [doc.student, doc.state])
    );

    for (const student of studentList) {
      const studentId = student.id; // or whatever the identifier field is
      const email = student.email;
      const hasFinal = studentDocuments.get(studentId) === "final";
      const hasDraft = studentDocuments.get(studentId) === "draft";
      console.log(`Processing student ${studentId}: email=${email}, hasFinal=${hasFinal}, hasDraft=${hasDraft}`);
      
      const timesheetUrl = `http://localhost:3000/students?week=${encodeURIComponent("Week " + currentWeek)}`;

      if (!hasFinal) {
        console.log(`No final document found for student ${studentId} for Week ${currentWeek}. Sending reminder email.`);
        sendEmail({
          to: email,
          subject: "Reminder: Final Document Submission Required",
          text: `Your final document for Week ${currentWeek} is missing. Please submit it as soon as possible. You can access the timesheet website here: ${timesheetUrl}`,
          html: `Your final document for <strong>Week ${currentWeek}</strong> is missing. Please submit it as soon as possible. You can access the timesheet website <a href="${timesheetUrl}">here</a>.`,
        });

        const notification = new NotificationDoc({
          name: student.name,
          id: studentId,
          group: student.group,
          email: student.email,
          message: `No final document found for student ${studentId} for Week ${currentWeek}. Sending reminder email.`,
          week: `Week ${currentWeek}`,
          time: new Date(),
        });

        await upsertNotification(notification);

        if (!hasDraft) {
          console.log(`Also no draft document found for student ${studentId}.`);
        }
        await delay(500); // wait 500ms for next email
      } else {
        console.log(`Final document exists for student ${studentId} for Week ${currentWeek}. No email will be sent.`);
      }
    }
  } catch (error) {
    console.error("Failed to send reminders:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}
