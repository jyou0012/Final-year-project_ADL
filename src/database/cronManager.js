import { getScheduler, setCronStatus } from './scheduler';
import cron from 'node-cron';
import { sendDraftReminders } from '../sendEmail';

let scheduledJob = null;
let currentSchedule = null;
const defaultSchedule = '0 16 * * 5'; // Default to run at 16:00 every Friday

async function checkAndUpdateCronSchedule() {
  try {
    let newSchedule = await getScheduler();
    if (!newSchedule) {
      newSchedule = defaultSchedule;
      console.log("Cron Manager: No schedule found in database, using default schedule:", defaultSchedule);
    }

    if (newSchedule !== currentSchedule) {
      console.log("Cron Manager: Detected change in cron schedule. New Schedule:", newSchedule);

      // Cancel the existing job if it exists
      if (scheduledJob) {
        scheduledJob.stop(); // Stop the existing job
        console.log("Cron Manager: Existing cron job stopped.");
      }

      // Schedule the new job
      scheduledJob = cron.schedule(newSchedule, async () => {
        console.log("Cron Job: Running scheduled task to send draft reminders...");
        await sendDraftReminders();
      });
      console.log("Cron Manager: New cron job scheduled with schedule:", newSchedule);

      // Update the current schedule
      currentSchedule = newSchedule;

      // Update the cron status in the database
      await setCronStatus(true);
    }
  } catch (error) {
    console.error("Cron Manager: Error checking/updating cron schedule:", error);
  }
}

// Function to start the periodic check
export function startCronManager(interval = 60000) { // Check every minute by default
  checkAndUpdateCronSchedule(); // Initial check
  setInterval(checkAndUpdateCronSchedule, interval);
}
