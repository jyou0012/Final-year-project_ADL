"use server";

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);



export async function timesheetData(week) {
  await client.connect();
  const db = client.db("TimesheetDashboard");
  await db.createCollection("timesheet");
  const timesheet = db.collection("timesheet");

  const r = await timesheet.findOne({ week: 1 });
  console.log(r);
  return r;
}

export default async function timesheetFormAction(formData) {
  //const client = new MongoClient(process.env.MONGODB_URI);
  console.log(formData);
  await client.connect();
  const db = client.db("TimesheetDashboard");
  //await db.createCollection("timesheet");
  const timesheet = db.collection("timesheet");
  await timesheet.updateOne(
    { week: formData.get("week") },
    {
      $set: {
        week: formData.get("week"),
        mon: {
          date: formData.get("MonDate"),
          timeStart: formData.get("MonStart"),
          timeEnd: formData.get("MonEnd"),
          task: formData.get("MonTask"),
          fit : formData.get("MonFit"),
          outcome : formData.get("MonOutcome")
        },
        tue: {
          date: formData.get("TueDate"),
          timeStart: formData.get("TueStart"),
          timeEnd: formData.get("TueEnd"),
          task: formData.get("TueTask"),
          fit : formData.get("TueFit"),
          outcome : formData.get("TueOutcome")
        },
        wed: {
          date: formData.get("WedDate"),
          timeStart: formData.get("WedStart"),
          timeEnd: formData.get("WedEnd"),
          task: formData.get("WedTask"),
          fit : formData.get("WedFit"),
          outcome : formData.get("WedOutcome")
        },
        thu: {
          date: formData.get("ThuDate"),
          timeStart: formData.get("ThuStart"),
          timeEnd: formData.get("ThuEnd"),
          task: formData.get("ThuTask"),
          fit : formData.get("ThuFit"),
          outcome : formData.get("ThuOutcome")
        },
        fri: {
          date: formData.get("FriDate"),
          timeStart: formData.get("FriStart"),
          timeEnd: formData.get("FriEnd"),
          task: formData.get("FriTask"),
          fit : formData.get("FriFit"),
          outcome : formData.get("FriOutcome")
        },
      },
    },
    { upsert: true },
  );

  //	timesheet.find({week: 1})
  console.log(await timesheet.countDocuments({ week: "1" }));
}
