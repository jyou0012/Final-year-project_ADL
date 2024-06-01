import { MongoClient } from "mongodb";
import { STATE } from "../const";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export const studentCollection = database.collection("student");
export const timesheetCollection = database.collection("timesheet");

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function StudentDoc({ name, id, group, email, client }) {
  this.name = name;
  this.id = id;
  this.group = group;
  this.email = email;
  this.client = client;
}

export async function getAllGroups() {
  return Object.fromEntries(
    Array.from(
      await studentCollection
        .aggregate([{ $group: { _id: "$group", count: { $sum: 1 } } }])
        .toArray(),
      (group) => [group._id, group.count],
    ),
  );
}

export async function getStudent(id) {
  return await studentCollection.findOne({ id: id });
}

export async function getStudentByGroup(group) {
  return await studentCollection.find({ group: group }).toArray();
}

export async function upsertStudent(studentDoc) {
  await studentCollection.updateOne(
    { id: studentDoc.id },
    {
      $set: {
        name: studentDoc.name,
        id: studentDoc.id,
        group: studentDoc.group,
        email: studentDoc.email,
        client: studentDoc.client,
      },
    },
    { upsert: true },
  );
}

export async function getAllStudents() {
  console.log(
    await studentCollection
      .aggregate([{ $group: { _id: "$group" } }])
      .toArray(),
  );
  return await studentCollection.find({}).toArray();
}

export async function getAllStudentWeeklyHours(group) {
  const students = await studentCollection.find({ group }).toArray();

  const weeklyHoursData = await Promise.all(
    students.map(async (student) => {
      const timesheets = await timesheetCollection
        .find({ student: student.id, state: STATE.final })
        .toArray();

      // 按天组织数据
      const dailyHours = timesheets.reduce((acc, sheet) => {
        weekdays.forEach(day => {
          if (sheet.weekFields && sheet.weekFields[day]) {
            acc[day] = acc[day] || [];
            acc[day].push(sheet.weekFields[day].totalHours || 0);
          }
        });
        return acc;
      }, {});

      return {
        name: student.name,
        dailyHours
      };
    })
  );

  return weeklyHoursData;
}

