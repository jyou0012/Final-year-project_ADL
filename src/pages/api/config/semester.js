// src/pages/api/config/semester.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db('TimesheetDashboard');
      const configCollection = database.collection('semesterInfo');
      const config = await configCollection.findOne({ semesterName: '2024S1' });

      if (!config) {
        console.log('Semester info not found');
        res.status(404).json({ error: 'Semester info not found' });
        return;
      }

      console.log('Fetched semester info:', config);

      res.status(200).json({
        semesterStart: config.semesterStart,
        breaks: [
          { start: config.middleBreakStart, end: config.middleBreakEnd }
        ]
      });
    } catch (error) {
      console.error('Failed to fetch semester info:', error);
      res.status(500).json({ error: 'Failed to fetch semester info' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
