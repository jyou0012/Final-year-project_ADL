// src/database/scheduler.js
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export const timeScheduler = database.collection("scheduler");

export async function getScheduler() {
  try {
    const scheduleDoc = await timeScheduler.findOne({ scheduleName: 'draftReminderSchedule' });
    if (scheduleDoc && scheduleDoc.cronSchedule) {
      console.log('Schedule found in database:', scheduleDoc.cronSchedule);
      return scheduleDoc.cronSchedule;
    } else {
      console.log('Schedule not found in database');
      return null;
    }
  } catch (error) {
    console.error('Error fetching scheduler from database:', error);
    throw error;
  }
}

export async function upsertScheduler(scheduleDoc) {
  try {
    await timeScheduler.updateOne(
      { scheduleName: 'draftReminderSchedule' },
      {
        $set: {
          cronSchedule: scheduleDoc.cronSchedule,
        },
      },
      { upsert: true }
    );
  } catch (error) {
    console.error('Error upserting scheduler to database:', error);
    throw error;
  }
}

export async function checkCronStatus() {
  try {
    const statusDoc = await timeScheduler.findOne({ scheduleName: 'draftReminderSchedule' });
    return statusDoc ? statusDoc.isRunning : false;
  } catch (error) {
    console.error('Error checking cron status from database:', error);
    throw error;
  }
}

export async function setCronStatus(isRunning) {
  try {
    const result = await timeScheduler.updateOne(
      { scheduleName: 'draftReminderSchedule' },
      { $set: { isRunning } },
      { upsert: true }
    );
    return result;
  } catch (error) {
    console.error('Error setting cron status in database:', error);
    throw error;
  }
}

export async function resetCronStatus() {
  try {
    const result = await timeScheduler.updateOne(
      { scheduleName: 'draftReminderSchedule' },
      { $set: { isRunning: false } },
      { upsert: true }
    );
    console.log('Cron status reset to false');
    return result;
  } catch (error) {
    console.error('Error resetting cron status in database:', error);
    throw error;
  }
}
