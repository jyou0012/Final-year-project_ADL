// src/database/config.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function getSemesterConfig() {
  try {
    await client.connect();
    const database = client.db('TimesheetDashboard');
    const configCollection = database.collection('semesterInfo');
    const config = await configCollection.findOne({ semesterName: '2024S1' });

    return {
      semesterStart: config.semesterStart,
      breaks: [
        { start: config.middleBreakStart, end: config.middleBreakEnd }
      ]
    };
  } finally {
    await client.close();
  }
}
