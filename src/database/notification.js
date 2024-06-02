import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export const notificationCollection = database.collection("notification");

export function NotificationDoc({ id, message, time }) {
  this.id = id;
  this.message = message;
  this.time = time;
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
    await notificationCollection.updateOne(
      { id: notificationDoc.id },
      {
        $set: {
          message: notificationDoc.message,
          time: notificationDoc.time,
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
