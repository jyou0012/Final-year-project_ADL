"use server";

import { dbTimesheetUpsert } from "../../database/timesheet";
import { weekdays, inputFields } from "../../const";

export default async function timesheetFormAction(formData) {
  weekdays.forEach((day) =>
    dbTimesheetUpsert({
      student: "a1234567",
      week: formData.get(inputFields["week"]),
      day: day,
      type: "submission",
      date: formData.get(inputFields[day]["date"]),
      start: formData.get(inputFields[day]["start"]),
      end: formData.get(inputFields[day]["end"]),
      task: formData.get(inputFields[day]["task"]),
      fit: formData.get(inputFields[day]["fit"]),
      outcome: formData.get(inputFields[day]["outcome"]),
    }),
  );
}
