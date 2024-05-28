import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export const semesterCollection = database.collection("semesterTime");

export async function getSemesterStartDate() {
  try {
    
    const semesterDoc = await semesterCollection.findOne({ name: 'semesterStartDate' });
    if (semesterDoc && semesterDoc.date) {
      console.log('Semester start date found in database:', semesterDoc.date);
      return semesterDoc.date;
    } else {
      console.log('Semester start date not found in database');
      return null;
    }
  } catch (error) {
    console.error('Error fetching semester start date from database:', error);
    throw error;
  }
}

export async function getSemesterBreaks() {
  try {
    
    const semesterDoc = await semesterCollection.findOne({ name: 'semesterBreaks' });
    if (semesterDoc && semesterDoc.breaks) {
      console.log('Semester breaks found in database:', semesterDoc.breaks);
      return semesterDoc.breaks;
    } else {
      console.log('Semester breaks not found in database');
      return null;
    }
  } catch (error) {
    console.error('Error fetching semester breaks from database:', error);
    throw error;
  }
}

export async function setSemesterStartDate(date) {
  try {
    
    const result = await semesterCollection.updateOne(
      { name: 'semesterStartDate' },
      { $set: { date } },
      { upsert: true }
    );
    return result;
  } catch (error) {
    console.error('Error setting semester start date in database:', error);
    throw error;
  }
}

export async function setSemesterBreaks(breaks) {
  try {
    
    const result = await semesterCollection.updateOne(
      { name: 'semesterBreaks' },
      { $set: { breaks } },
      { upsert: true }
    );
    return result;
  } catch (error) {
    console.error('Error setting semester breaks in database:', error);
    throw error;
  }
}
