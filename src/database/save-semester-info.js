import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export default async function saveSemesterInfo(data) {
  try {
    await client.connect();
    const collection = database.collection("semesterInfo");

    const { semesterName, semesterStart, semesterEnd, middleBreakStart, middleBreakEnd } = data;

    const result = await collection.updateOne(
      { semesterName },
      {
        $set: {
          semesterName,
          semesterStart,
          semesterEnd,
          middleBreakStart,
          middleBreakEnd,
          updatedAt: new Date(),
        }
      },
      { upsert: true }
    );

    return { success: true, message: 'Semester info saved successfully', data: result };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred while saving semester info' };
  } finally {
    await client.close();
  }
}
