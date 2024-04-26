import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
const timesheet = database.collection("timesheet");
const drafts = database.collection("drafts"); // Collection for drafts

export async function dbTimesheetGetByStudent({ student, type }) {
  return await timesheet.findOne({ student: student, type: type }) || {};
}

export async function dbTimesheetUpsertByWeek({ student, type, week, data }) {
  const now = Date.now();
  await timesheet.updateOne(
    { student: student, type: type },
    {
      $set: {
        student: student,
        type: type,
        createdTime: now,
        modifiedTime: now,
        [week]: data,
      },
    },
    { upsert: true },
  );
}

// Function to save drafts
export async function dbTimesheetSaveDraft({ student, type, week, data }) {
  const now = Date.now();
  await drafts.updateOne(
    { student: student, type: type },
    {
      $set: {
        student: student,
        type: type,
        createdTime: now,
        modifiedTime: now,
        [week]: data,
      },
    },
    { upsert: true },
  );
}

// Function to handle final submission
export async function dbTimesheetSubmitFinal({ student, data, type }) {
  const now = Date.now();
  await timesheet.insertOne({
    student: student,
    type: type,
    createdTime: now,
    data: data,
  });
}
