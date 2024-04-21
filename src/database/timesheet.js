export default function timesheetData() {
  return {
    Mon1: 1,
    Mon2: 2,
  };
}

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);



export async function timesheetData(week) {
  await client.connect();
  const db = client.db("TimesheetDashboard");
  const timesheet = db.collection("timesheet");

  const r = await timesheet.findOne({ week: 1 });
  console.log(r);
  return r;
}
