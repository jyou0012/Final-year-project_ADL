const fetch = require('node-fetch');
require('dotenv').config();

const port = process.env.PORT || 3000;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${port}`;

async function resetAndScheduleCronJob() {
  try {
    const response = await fetch(`${baseUrl}/api/cron`, {
      method: 'POST',
    });
    const data = await response.json();

    if (!response.ok) {
      console.error('Error scheduling cron job:', data.error);
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.error('Error calling cron API route:', error);
  }
}

resetAndScheduleCronJob();
