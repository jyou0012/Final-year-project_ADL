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
    to: 'youjiayu99@gmail.com',
    subject: 'Test Email',
    text: student + ' ' + week + ' ' + state + ' ' ,
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




