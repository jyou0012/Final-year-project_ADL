"use server";

import saveSemesterInfo from "../../../database/save-semester-info";

export async function formAction(data) {
  const result = await saveSemesterInfo(data);

  return {
    success: result.success,
    message: result.message,
    data: result.data ? {
      acknowledged: result.data.acknowledged,
      modifiedCount: result.data.modifiedCount,
      upsertedId: result.data.upsertedId ? result.data.upsertedId.toString() : null,
      upsertedCount: result.data.upsertedCount,
      matchedCount: result.data.matchedCount,
    } : null,
  };
}

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export async function fetchSemesterInfo() {
  try {
    await client.connect();
    const collection = database.collection("semesterInfo");
    const result = await collection.find({}).toArray();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch semester info:", error);
    return { success: false, error: error.message };
  } finally {
    await client.close();
  }
}
