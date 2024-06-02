"use server";

import { MongoClient } from "mongodb";
import { notificationCollection } from "../../../database/notification";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export async function formAction({ csv }) {
  const rows = csv.split("\n").slice(1);
  for (const row of rows) {
    const [name, id, group, email, client] = row.split(",");
    if (name && id && group && email && client) {
      await notificationCollection.updateOne(
        { id },
        { $set: { name, id, group, email, client } },
        { upsert: true },
      );
    }
  }
  return "Data uploaded and records updated.";
}

export async function fetchNotifications(query) {
  await client.connect();
  const searchQuery = query
    ? {
        $or: [
          { message: { $regex: query, $options: "i" } },
          { id: { $regex: query, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
          { studentId: { $regex: query, $options: "i" } },
          { group: { $regex: query, $options: "i" } },
        ],
      }
    : {};
  const notifications = await notificationCollection.find(searchQuery).toArray();
  await client.close();

  // Transform the documents to plain objects and format date
  return notifications.map(notification => ({
    id: notification.id,
    name: notification.name,
    studentId: notification.studentId,
    group: notification.group,
    email: notification.email,
    message: notification.message,
    time: notification.time.toISOString(), // Convert Date to string
  }));
}
