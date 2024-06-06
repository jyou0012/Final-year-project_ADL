// src/pages/api/scheduler.js
import { getScheduler, upsertScheduler } from "../../database/scheduler";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const cronSchedule = await getScheduler();
      res.status(200).json({ success: true, cronSchedule });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { cronSchedule } = req.body;
      await upsertScheduler({ cronSchedule });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
