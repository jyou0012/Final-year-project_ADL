import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
const timesheet = database.collection("timesheet");
const drafts = database.collection("drafts"); // Collection for drafts

export async function dbTimesheetGetByStudent({ student }) {
  const draftsEntry = await drafts.findOne({ student: student, type: "draft" });
  const timesheetEntry = await timesheet.findOne({ student: student, type: "submission" });
  //console.log(type);

  if (draftsEntry) {
    // If there are entries in drafts, return the drafts context
    console.log("draft");
    return draftsEntry;
  } else if (timesheetEntry) {
    // If there are no entries in drafts but there are entries in timesheet, return timesheet context
    console.log("submission");
    return timesheetEntry;
  } else {
    // If there are no entries in both drafts and timesheet, return an empty object
    return {};
  }
}

export async function dbTimesheetGetByStudentDraft({ student, type }) {
  return await drafts.findOne({ student: student, type: type }) || {};
}
 
export async function dbTimesheetUpsertByWeek({ student, type, week, data }) {
  const now = Date.now();
  await timesheet.updateOne(
    { student: student, type: type },
    {
      $set: {
        student: student,
        type: type,
        createdTime: now,
        modifiedTime: now,
        [week]: data,
      },
    },
    { upsert: true },
  );
  await drafts.deleteOne({ student: student, type: "draft" });
}

// Function to save drafts
export async function dbTimesheetSaveDraft({ student, type, week, data }) {
  const now = Date.now();
  await drafts.updateOne(
    { student: student, type: type },
    {
      $set: {
        student: student,
        type: type,
        createdTime: now,
        modifiedTime: now,
        [week]: data,
      },
    },
    { upsert: true },
  );
}

// Function to handle final submission
export async function dbTimesheetSubmitFinal({ student, data, type }) {
  const now = Date.now();
  await timesheet.insertOne({
    student: student,
    type: type,
    createdTime: now,
    data: data,
  });
}
