"use server";

import { verifySession } from "../../session";
import { DayFields, dbTimesheetUpsert } from "../../database/timesheet";
import { weekdays, inputFields, STATE } from "../../const";

export default async function timesheetFormAction(prevState, formData) {
  const session = await verifySession()

  console.log(44, formData)
  dbTimesheetUpsert({
    student: session.userId,
    week: formData.get(inputFields["week"]),
    state: formData.get(inputFields["state"]),
    weekFields: Object.fromEntries(
      weekdays.map((day) => [
        day,
        new DayFields({
          date: formData.get(inputFields[day]["date"]) || null,
          start: formData.get(inputFields[day]["start"]) || null,
          end: formData.get(inputFields[day]["end"]) || null,
          task: formData.get(inputFields[day]["task"]) || null,
          fit: formData.get(inputFields[day]["fit"]) || null,
          outcome: formData.get(inputFields[day]["outcome"]) || null,
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
