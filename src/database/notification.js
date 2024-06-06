import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export const notificationCollection = database.collection("notification");

export function NotificationDoc({ name, id, group, email, message, time , week}) {
  this.name = name;
  this.id = id;
  this.group = group;
  this.email = email;
  this.message = message;
  this.time = time;
  this.week = week;
}

export async function getNotification(id) {
  try {
    await client.connect();
    return await notificationCollection.findOne({ id: id });
  } catch (error) {
    console.error("Failed to get notification:", error);
  } finally {
    await client.close();
  }
}

export async function getAllNotifications() {
  try {
    await client.connect();
    return await notificationCollection.find({}).toArray();
  } catch (error) {
    console.error("Failed to get notifications:", error);
  } finally {
    await client.close();
  }
}

export async function upsertNotification(notificationDoc) {
  try {
    await client.connect();
    // Create a unique identifier using both student ID and week
    const uniqueId = `${notificationDoc.id}-${notificationDoc.week}`;
    
    await notificationCollection.updateOne(
      { uniqueId: uniqueId }, // Use the unique identifier for upsert
      {
        $set: {
          name: notificationDoc.name,
          id: notificationDoc.id,
          group: notificationDoc.group,
          email: notificationDoc.email,
          message: notificationDoc.message,
          time: notificationDoc.time,
          week: notificationDoc.week, // Ensure the week field is set
        },
      },
      { upsert: true }
    );
  } catch (error) {
    console.error("Failed to upsert notification:", error);
  } finally {
    await client.close();
  }
}

