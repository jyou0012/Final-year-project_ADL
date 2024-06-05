import { NextResponse } from 'next/server';
import { getScheduler, checkCronStatus, setCronStatus, resetCronStatus } from '../../../database/scheduler';
import { startCronManager } from '../../../database/cronManager';

export async function POST(req) {
  try {
    // Optionally reset the cron status
    await resetCronStatus();

    let cronSchedule = await getScheduler();
    if (!cronSchedule) {
      cronSchedule = '0 16 * * 5'; // Default to run at 16:00 every Friday
      console.log("API: No schedule found in database, using default schedule:", cronSchedule);
    }

    const isCronRunning = await checkCronStatus();
    if (!isCronRunning) {
      startCronManager(); // Start the cron manager if not already running
      console.log("Cron job set up with schedule:", cronSchedule);
      await setCronStatus(true); // Mark the cron job as running
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
