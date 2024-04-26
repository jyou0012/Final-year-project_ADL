import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
const timesheet = database.collection("timesheet");

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
        motifiedTime: now,
        [week]: data,
      },
    },
    { upsert: true },
  );
}
