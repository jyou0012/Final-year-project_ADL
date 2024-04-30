import { DragHandle } from "@mui/icons-material";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
const timesheet = database.collection("timesheet");
const drafts = database.collection("drafts"); // Collection for drafts

export async function* dbTimesheetGetByStudent({ student }) {
  try {
    const weeks = [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
      "Week 9",
      "Week 10",
      "Week 11",
      "Week 12",
    ];

    for (const week of weeks) {
      const submissionEntry = await timesheet.findOne({
        student: student,
        type: "submission",
        week: week,
      });
      const draftEntry = await timesheet.findOne({
        student: student,
        type: "draft",
        week: week,
      });

      if (submissionEntry) {
        yield submissionEntry;
      } else if (draftEntry) {
        yield draftEntry;
      } else {
        yield {}; // Yield an empty object for weeks with no data
      }
    }
  } catch (error) {
    console.error("Error retrieving timesheet data:", error);
    throw error;
  }
}

export async function processTimesheets(student) {
  const generator = dbTimesheetGetByStudent({ student: student });
  let entry = "";
  for await (const timesheet of generator) {
    //console.log(timesheet);  // Process each yielded timesheet
    entry = timesheet;
  }
  //console.log(JSON.parse(JSON.stringify(timesheet)));
  console.log(entry);
  return entry;
}

export async function dbTimesheetUpsertByWeek({ student, type, week, data }) {
  const now = Date.now();
  try {
    // Upsert the current submission or draft
    await timesheet.updateOne(
      { student: student, week: week },
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

    // If the submission is a final submission, delete any drafts
    if (type === "submission") {
      await timesheet.deleteOne({
        student: student,
        week: week,
        type: "draft",
      });
    }
  } catch (error) {
    console.error("Error handling timesheet operation:", error);
    throw error; // Rethrow or handle error as appropriate for your application
  }
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

processTimesheets();
