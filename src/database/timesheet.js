import { DragHandle } from "@mui/icons-material";
import { MongoClient } from "mongodb";
import { weeks, STATE } from "../const";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
const timesheet = database.collection("timesheet");
const drafts = database.collection("drafts"); // Collection for drafts

export function TimesheetInput({ date, start, end, task, fit, outcome }) {
  this.date = date;
  this.start = start;
  this.end = end;
  this.task = task;
  this.fit = fit;
  this.outcome = outcome;
}

export function TimesheetOutput({ student }) {
  this.student = student;

  for (const week of weeks) {
    this[week] = {
      state: STATE.empty,
      draftUpdatedTime: null,
      finalUpdatedTime: null,
    };
  }
}

export async function dbTimesheetGet({ student }) {
  let timesheetOutput = new TimesheetOutput({ student: student });

  let draft = await timesheet.find({ student: student, state: STATE.draft });
  for (const d of await draft.toArray()) {
    timesheetOutput[d.week] = {
      draftUpdatedTime: d.updatedTime,
      ...d,
    };
  }

  let final = await timesheet.find({ student: student, state: STATE.final });
  for (const f of await final.toArray()) {
    timesheetOutput[f.week] = {
      ...timesheetOutput[f.week],
      finalUpdatedTime: f.updatedTime,
      ...f,
    };
  }
  return timesheetOutput;
}

export async function dbTimesheetUpsert({
  student,
  week,
  state,
  timesheetInput,
}) {
  const sendEmail = require('./sendEmail');
  const now = Date.now();
  sendEmail({
    to: student + '@adelaide.edu.au',
    subject: student + ' ' + week + ' ' + state + ' ',
    text: week + ' ' + state + ' '+'submitted by '+ student + ' at ' + now + '',
});
  await timesheet.updateOne(
    { student: student, week: week, state: state },
    {
      $set: {
        week: week,
        state: state,
        student: student,
        createdTime: now,
        updatedTime: now,
        ...timesheetInput,
      },
    },
    { upsert: true },
  );
}

// Function to check the documents and send emails
export const checkDraftsAndSendEmails = async (timesheetOutput) => {
  const sendEmail = require('./sendEmail');
  try {
      let emailPromises = [];
      // Loop through weeks in the timesheetOutput
      for (const week in timesheetOutput) {
          if (timesheetOutput.hasOwnProperty(week) && timesheetOutput[week].state === 'draft') {
              const emailData = {
                  to: timesheetOutput.student + '@adelaide.edu.au',
                  subject: `Reminder: Your entry is still in draft for ${week}`,
                  text: `Hi, your entry for ${week} is still in draft. Please complete it.`
              };
              // Push the email sending function wrapped in a promise that resolves with a delay
              emailPromises.push(new Promise((resolve) => setTimeout(() => resolve(sendEmail(emailData)), 1000 * emailPromises.length)));
          }
      }
      // Wait for all email promises to resolve
      await Promise.all(emailPromises);
  } catch (err) {
      console.error('Error sending email reminders for drafts', err);
  }
};






