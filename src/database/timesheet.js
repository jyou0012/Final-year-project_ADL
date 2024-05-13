import { MongoClient } from "mongodb";
import { weeks, weekdays, STATE } from "../const";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
const timesheet = database.collection("timesheet");

export function DayFields({ date, start, end, task, fit, outcome }) {
  this.date = date;
  this.start = start;
  this.end = end;
  this.task = task;
  this.fit = fit;
  this.outcome = outcome;
}

export function TimesheetDoc() {
  this.week = null
  this.state = STATE.empty
  this.student = null
  this.createdTime = null
  this.updatedTime = null

  for (const day of weekdays) {
  this[day] = {
  	date: null,
  	start: null,
  	end: null,
  	task: null,
  	fit: null,
  	outcome: null,
  }}
}

export async function getStudentTimesheets({ student, state }) {
  let timesheets = {}
  for (const t of await timesheet.find({ student: student, state: state }).toArray()) {
  	timesheets[t.week] = t
  }
  return timesheets
}

export async function getWeekTimesheets({team, state}) {
	let timesheets = {}
	for (const t of await timesheet.find({ student: student, state: state }).toArray()) {
		timesheets[t.student][t.week] = t
	}
}


export function TimesheetOutput({ student }) {
  this.student = student;

  for (const week of weeks) {
    this[week] = {
      state: STATE.empty,
      draftUpdatedTime: null,
      finalUpdatedTime: null,
      ...(new TimesheetInput({})),
    };
  }
}

export function WeekOverviewOutput({ team }) {
	this.team = team;

	const students = ["a123457"]
	for (const student of students) {
	}
}

export async function dbTimesheetUpsert({
  student,
  week,
  state,
  weekFields,
}) {
  const sendEmail = require('../sendEmail');
  const now = Date.now();
/*  sendEmail({
    to: student + '@adelaide.edu.au',
    subject: student + ' ' + week + ' ' + state + ' ',
    text: week + ' ' + state + ' '+'submitted by '+ student + ' at ' + now + '',
});
*/
  await timesheet.updateOne(
    { student: student, week: week, state: state },
    {
      $set: {
        week: week,
        state: state,
        student: student,
        createdTime: now,
        updatedTime: now,
        ...weekFields,
      },
    },
    { upsert: true },
  );
}

// Function to check the documents and send emails
export const checkDraftsAndSendEmails = async (timesheetOutput) => {
  const sendEmail = require('../sendEmail');
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
