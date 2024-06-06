import { MongoClient } from "mongodb";
import { getAllGroups, getStudentByGroup } from "./student";
import { weeks, weekdays, STATE } from "../const";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export const timesheet = database.collection("timesheet");

// await timesheet.deleteMany({});

export function DayFields({
  date,
  start,
  end,
  task,
  fit,
  outcome,
  totalHours,
}) {
  this.date = date;
  this.start = start;
  this.end = end;
  this.task = task;
  this.fit = fit;
  this.outcome = outcome;
  this.totalHours = totalHours;
}

export function TimesheetDoc() {
  this.week = null;
  this.state = STATE.empty;
  this.student = null;
  this.group = null;
  this.createdTime = null;
  this.updatedTime = null;
  this.weeklyTotalHours = null;

  for (const day of weekdays) {
    this[day] = {
      date: null,
      start: null,
      end: null,
      task: null,
      fit: null,
      outcome: null,
      totalHours: null,
    };
  }
}

export async function getStudentTimesheets({ student, state }) {
  let timesheets = {};
  for (const t of await timesheet
    .find({ student: student, state: state })
    .toArray()) {
    timesheets[t.week] = t;
  }
  return timesheets;
}

export async function getWeekTimesheets({ group, state }) {
  let timesheets = {};

  const students = await getStudentByGroup(group);

  for (const s of students) {
    timesheets[s.id] = {};
  }

  for (const t of await timesheet
    .find({
      student: { $in: students.map((student) => student.id) },
      state: state,
    })
    .toArray()) {
    timesheets[t.student][t.week] = t;
  }

  return timesheets;
}

export async function getGroupsTimesheets({ state }) {
  let timesheets = {};

  const groups = await getAllGroups();

  timesheets["all"] = {
	studentCount: 0,
}

  for (const g of Object.keys(groups)) {
	const students = await getStudentByGroup(g)

    timesheets[g] = {};
    timesheets[g]["students"] = Array.from(
      students,
      (student) => student.id,
    );

    timesheets[g]["studentTotalHours"] = Object.fromEntries(
	Array.from(students,
	(student) => [student.id, 0]
	));

    timesheets["all"]["studentCount"] += students.length
    for (const week of weeks) {
      timesheets["all"][week] = {
	finalCount: 0,
	}
      timesheets[g][week] = {
        groupWeeklyTotalHours: 0,
        studentCount: groups[g],
        finalCount: 0,
      };
    }
  }

  console.log(timesheets);
  for (const t of await timesheet.find({ state: state }).toArray()) {
    console.log(t);
    timesheets["all"][t.week].finalCount += 1;
    timesheets[t.group][t.week].finalCount += 1;
    timesheets[t.group][t.week].groupWeeklyTotalHours += t.weeklyTotalHours;
    timesheets[t.group]["studentTotalHours"][t.student] += t.weeklyTotalHours;
    timesheets[t.group][t.week][t.student] = t.weeklyTotalHours;
  }

  return timesheets;
}

export function TimesheetOutput({ student }) {
  this.student = student;

  for (const week of weeks) {
    this[week] = {
      state: STATE.empty,
      draftUpdatedTime: null,
      finalUpdatedTime: null,
      ...new TimesheetInput({}),
    };
  }
}

export async function dbTimesheetUpsert({
  student,
  group,
  week,
  state,
  weeklyTotalHours,
  weekFields,
}) {

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
        group: group,
        weeklyTotalHours: weeklyTotalHours,
        createdTime: now,
        updatedTime: now,
        ...weekFields,
      },
    },
    { upsert: true },
  );
}

// Function to check the documents and send emails
/* export const checkDraftsAndSendEmails = async (timesheetOutput) => {
  const sendEmail = require("../sendEmail");
  try {
    let emailPromises = [];
    // Loop through weeks in the timesheetOutput
    for (const week in timesheetOutput) {
      if (
        timesheetOutput.hasOwnProperty(week) &&
        timesheetOutput[week].state === "draft"
      ) {
        const emailData = {
          to: timesheetOutput.student + "@adelaide.edu.au",
          subject: `Reminder: Your entry is still in draft for ${week}`,
          text: `Hi, your entry for ${week} is still in draft. Please complete it.`,
        };
        // Push the email sending function wrapped in a promise that resolves with a delay
        emailPromises.push(
          new Promise((resolve) =>
            setTimeout(
              () => resolve(sendEmail(emailData)),
              1000 * emailPromises.length,
            ),
          ),
        );
      }
    }
    // Wait for all email promises to resolve
    await Promise.all(emailPromises);
  } catch (err) {
    console.error("Error sending email reminders for drafts", err);
  }
}; */
