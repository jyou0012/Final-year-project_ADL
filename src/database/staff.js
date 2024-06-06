import { MongoClient } from "mongodb";
import { upsertScheduler } from "./scheduler";
import {
  getSemesterStartDate,
  getSemesterBreaks,
  setSemesterStartDate,
  setSemesterBreaks
} from "./semesterTime";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export const staffCollection = database.collection("staff");

export function StaffDoc({ name, password }) {
  this.name = name;
  this.password = password;
}

export async function getStaff(name) {
  return await staffCollection.findOne({ name: name });
}

export async function upsertStaff(staffDoc) {
  await staffCollection.updateOne(
    { name: staffDoc.name },
    {
      $set: {
        name: staffDoc.name,
        password: staffDoc.password,
      },
    },
    { upsert: true },
  );
}

(async () => {
  await client.connect();
  await upsertStaff(new StaffDoc({ name: "Staff1", password: "staff123" }));
  await upsertStaff(new StaffDoc({ name: "Staff2", password: "staff123" }));
  
})();
