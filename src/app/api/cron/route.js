import { NextResponse } from 'next/server';
import { getScheduler, checkCronStatus, setCronStatus, resetCronStatus } from '../../../database/scheduler';
import cron from 'node-cron';
import sendDraftReminders from '../../../sendEmail';

let isCronScheduled = false;

export async function POST(req) {
  try {
    // Reset the cron status on server start
    await resetCronStatus();

    const cronSchedule = await getScheduler();
    if (!cronSchedule) {
      return NextResponse.json({ error: 'Cron schedule not found' }, { status: 404 });
    }

    const isCronRunning = await checkCronStatus();
    if (!isCronRunning && !isCronScheduled) {
      cron.schedule(cronSchedule, () => {
        console.log("Running scheduled task to send draft reminders...");
        sendDraftReminders();
      });
      console.log("Cron job set up with schedule:", cronSchedule);
      await setCronStatus(true); // Mark the cron job as running
      isCronScheduled = true;
      return NextResponse.json({ message: 'Cron job scheduled' });
    } else {
      console.log("Cron job is already running or scheduled.");
      return NextResponse.json({ message: 'Cron job is already running or scheduled.' });
    }
  } catch (error) {
    console.error("Error setting up cron job:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
