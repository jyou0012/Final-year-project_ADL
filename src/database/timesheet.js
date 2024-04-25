import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
const timesheet = database.collection("timesheet");

export async function dbTimesheetGetByDay({ student, week, day, type }) {
	return await timesheet.findOne({ student: student, week: week, day: day, type: type })
}

export async function dbTimesheetGetByWeek({ student, week, type }) {
  return await timesheet.find({ student: student, week: week, type: type }).toArray();
}

export async function dbTimesheetGetByStudent({ student, type }) {
  return await timesheet.find({ student: student, type: type }).toArray();
}

export async function dbTimesheetUpsert({ student, week, day, type, date, start, end, task, fit, outcome }) {
	await timesheet.updateOne(
		{ student: student, week: week, day: day, type: type },
		{
			$set: {
			student: student,
			week: week,
			day: day,
			type: type,
			date: date,
			start: start,
			task: task,
			end: end,
			fit: fit,
			outcome: outcome,
			}
		},
		{ upsert: true },
	)
}
