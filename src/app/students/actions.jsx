"use server";

import { DayFields, dbTimesheetUpsert } from "../../database/timesheet";
import { weekdays, inputFields, STATE } from "../../const";

export default async function timesheetFormAction(prevState, formData) {
  dbTimesheetUpsert({
    student: "a1234567",
    week: formData.get(inputFields["week"]),
    state: formData.get(inputFields["state"]),
    weekFields: Object.fromEntries(
      weekdays.map((day) => [
        day,
        new DayFields({
          date: formData.get(inputFields[day]["date"]),
          start: formData.get(inputFields[day]["start"]),
          end: formData.get(inputFields[day]["end"]),
          task: formData.get(inputFields[day]["task"]),
          fit: formData.get(inputFields[day]["fit"]),
          outcome: formData.get(inputFields[day]["outcome"]),
        }),
      ]),
    ),
  });

  return (
    "Success: your timesheet " +
    formData.get(inputFields["state"]) +
    " has been " +
    (formData.get(inputFields["state"]) == STATE.final ? "submitted" : "saved")
  );
}
