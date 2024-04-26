"use server";

import { dbTimesheetUpsertByWeek } from "../../database/timesheet";
import { weekdays, inputFields } from "../../const";

export default async function timesheetFormAction(formData) {
  dbTimesheetUpsertByWeek({
    student: "a1234567",
    type: "submission",
    week: formData.get(inputFields["week"]),
    data: Object.fromEntries(
      weekdays.map((day) => [
        day,
        {
          date: formData.get(inputFields[day]["date"]),
          start: formData.get(inputFields[day]["start"]),
          end: formData.get(inputFields[day]["end"]),
          task: formData.get(inputFields[day]["task"]),
          fit: formData.get(inputFields[day]["fit"]),
          outcome: formData.get(inputFields[day]["outcome"]),
        },
      ]),
    ),
  });
}
