import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export const timeScheduler = database.collection("scheduler");

export async function getScheduler() {
    const scheduleDoc = await timeScheduler.findOne({ scheduleName: 'draftReminderSchedule' });
    if (scheduleDoc && scheduleDoc.cronSchedule) {
        //console.log('Schedule found in database:', scheduleDoc.cronSchedule, typeof(scheduleDoc.cronSchedule));
        const returnedSchedule = scheduleDoc.cronSchedule;
        console.log('Returned schedule:', returnedSchedule);
        return returnedSchedule;
      } else {
        console.log('Schedule not found in database');
      }
}

export async function upsertScheduler(scheduleDoc) {
    //console.log('Upserting scheduler...', scheduleDoc);
    await timeScheduler.updateOne(
        { scheduleName: 'draftReminderSchedule' },
        {
            $set: {
                cronSchedule: scheduleDoc.cronSchedule,
            },
        },
        { upsert: true },
    );
}