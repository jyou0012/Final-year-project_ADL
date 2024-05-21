const nodemailer = require("nodemailer");
const cron = require("node-cron");
import { MongoClient } from "mongodb";
const {
  getCurrentWeek,
  SEMESTER_START_DATE,
  SEMESTER_BREAKS,
  weeks,
} = require("./const");

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
const sendEmail = ({ to = "youjiayu99@gmail.com", subject, text, html }) => {
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
async function sendDraftReminders() {
  //week num 有问题
  //找有没有这个学生的final-》有就不发邮件 没有就发邮件
  try {
    await client.connect();
    console.log("Connected to MongoDB server successfully.");
    const currentWeek = getCurrentWeek(SEMESTER_START_DATE, SEMESTER_BREAKS);
    const studentList = await students.find({}).toArray();
    const weekQuery = { week: `Week ${currentWeek}` };

    console.log("currentWeek:", currentWeek);
    //console.log("student: ",studentList);

    const documents = await timesheet.find(weekQuery).toArray();
    const studentDocuments = new Map(
      documents.map((doc) => [doc.student, doc.state]),
    );

    for (const student of studentList) {
      const studentId = student.id; // or whatever the identifier field is
      //console.log(student);
      const email = student.email;
      const hasFinal = studentDocuments.get(studentId) === "final";
      const hasDraft = studentDocuments.get(studentId) === "draft";
      console.log("email:", email);
      const timesheetUrl = `http://localhost:3000/students?week=${encodeURIComponent("Week " + currentWeek)}`;

      if (!hasFinal) {
        console.log(
          `No final document found for student ${studentId} for Week ${currentWeek}. Sending reminder email.`,
        );
        sendEmail({
          to: email,
          subject: "Reminder: Final Document Submission Required",
          text: `Your final document for Week ${currentWeek} is missing. Please submit it as soon as possible. You can access the timesheet website here: ${timesheetUrl}`,
          html: `Your final document for <strong>Week ${currentWeek}</strong> is missing. Please submit it as soon as possible. You can access the timesheet website <a href="${timesheetUrl}">here</a>.`,
        });
        if (!hasDraft) {
          console.log(`Also no draft document found for student ${studentId}.`);
          // Additional reminders or actions can be triggered here if no draft exists.
          /* sendEmail({
          to: email,
          subject: "Reminder: Weekly timesheet submission required",
          text: `Your submission for Week ${currentWeek} is missing. Please submit it as soon as possible. You can access the timesheet website here: ${timesheetUrl}`,
          html: `Your submission for <strong>Week ${currentWeek}</strong> is missing. Please submit it as soon as possible. You can access the timesheet website <a href="${timesheetUrl}">here</a>.`
        }); */
        }
        await delay(500); //wait 500ms for next email
      } else {
        //console.log(`Final document exists for student ${studentId} for Week ${currentWeek}. No email will be sent.`,);
      }
    }
  } catch (error) {
    //console.error("Failed to send reminders:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

//At 16:00 on Friday send draft reminders
//https://crontab.guru/#00_16_*_*_5
cron.schedule("00 16 * * 5", () => {
  console.log("Running scheduled task to send draft reminders...");
  sendDraftReminders();
});

module.exports = sendEmail;
