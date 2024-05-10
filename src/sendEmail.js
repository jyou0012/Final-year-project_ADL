const nodemailer = require('nodemailer');
const cron = require('node-cron');
import { MongoClient } from "mongodb";
const { getCurrentWeek, SEMESTER_START_DATE, SEMESTER_BREAKS, weeks } = require('./const');



const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
const timesheet = database.collection("timesheet");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send email
const sendEmail = ({to = 'youjiayu99@gmail.com', subject, text}) => {
    const mailOptions = {
        from: 'group25y@outlook.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email: ', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
};

// Fetch drafts and send reminder emails
async function sendDraftReminders() {
    try {
        await client.connect();
        console.log("Connected to MongoDB server successfully.");
        const currentWeek = getCurrentWeek(SEMESTER_START_DATE, SEMESTER_BREAKS);
        const draftsQuery = { week: `Week ${currentWeek}`, state: 'draft' };

        const drafts = await timesheet.find(draftsQuery).toArray();
        console.log(`Found ${drafts.length} draft(s) for Week ${currentWeek}`);

        for (const draft of drafts) {
            const finalQuery = { student: draft.student, week: draft.week, state: 'final' };
            const finalDoc = await timesheet.findOne(finalQuery);

            if (finalDoc) {
                console.log(`Final document already exists for student ${draft.student} for Week ${draft.week}. No email will be sent.`);
            } else {
                console.log(`No final document found for student ${draft.student} for Week ${draft.week}. Sending reminder email.`);
                sendEmail({
                    to: draft.student + '@adelaide.edu.au',
                    subject: 'Reminder: Final Document Submission Required',
                    text: `Please note that your final document for Week ${currentWeek} is still missing. Please submit it as soon as possible.`
                });
            }
        }
    } catch (error) {
        console.error('Failed to send reminders:', error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

//At 16:00 on Friday send draft reminders
//https://crontab.guru/#00_16_*_*_5
cron.schedule('00 16 * * 5', () => {
    console.log("Running scheduled task to send draft reminders...");
    sendDraftReminders();
});

module.exports = sendEmail;

