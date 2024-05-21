"use server";

import { Readable } from "stream";
import { csvParser } from "csv-parser";
import { MongoClient } from "mongodb";
import { StudentDoc, upsertStudent } from "../../../database/student";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
const studentCollection = database.collection("student");

export async function formAction({ csv }) {
  const rows = csv.split("\n").slice(1);
  for (const row of rows) {
    const [name, id, group, email, client] = row.split(",");
    await studentCollection.updateOne(
      { id },
      { $set: { name, id, group, email, client } },
      { upsert: true },
    );
  }
  return "Data uploaded and student records updated.";
}

export async function fetchStudents() {
  return await studentCollection.find({}).toArray();
}
