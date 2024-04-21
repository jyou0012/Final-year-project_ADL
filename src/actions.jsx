"use server";

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function timesheetData(week) {
  await client.connect();
  const db = client.db("MCI2024");
  await db.createCollection("timesheet");
  const timesheet = db.collection("timesheet");

  const r = await timesheet.findOne({ week: 1 });
  console.log(r);
  return r;
}

export default async function timesheetFormAction(formData) {
  await client.connect();
  const db = client.db("TimesheetDashboard");
  await db.createCollection("timesheet");
  const timesheet = db.collection("timesheet");
  await timesheet.updateOne(
    { week: formData.get("Week") },
    {
      $set: {
        week: formData.get("Week"),
        mon: {
          task: formData.get("MonTask"),
        },
      },
    },
    { upsert: true },
  );

  //	timesheet.find({week: 1})
  console.log(await timesheet.countDocuments({ week: "1" }));
}
