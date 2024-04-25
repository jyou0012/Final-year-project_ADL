import { MongoClient } from "mongodb";
import { weekdays, inputFields } from "../const";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
const timesheet = database.collection("timesheet");

export async function dbTimesheetGet(week) {
  console.log(week);
  let r = await timesheet.findOne({ week: week });
  return r === null ? null : r["submission"];
}

export async function dbTimesheetUpsert(formData) {
  console.log(formData);
  const week = formData.get(inputFields["week"]);
  const weekData = Array.from(weekdays, (day) => ({
    date: formData.get(inputFields[day]["date"]),
    start: formData.get(inputFields[day]["start"]),
    end: formData.get(inputFields[day]["end"]),
    task: formData.get(inputFields[day]["task"]),
    fit: formData.get(inputFields[day]["fit"]),
    outcome: formData.get(inputFields[day]["outcome"]),
  }));
  let r = await timesheet.updateOne(
    {},
    {
      $set: {
        week: week,
        submission: weekData,
      },
    },
    { upsert: true },
  );

  return r["submission"];
}
