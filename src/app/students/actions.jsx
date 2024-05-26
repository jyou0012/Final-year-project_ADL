"use server";

import { verifySession } from "../../session";
import { DayFields, dbTimesheetUpsert } from "../../database/timesheet";
import { getStudent } from "../../database/student";
import { weekdays, inputFields, STATE } from "../../const";

export default async function timesheetFormAction(prevState, formData) {
  const session = await verifySession();

  const student = await getStudent(session.userId);

  dbTimesheetUpsert({
    student: student.id,
    group: student.group,
    week: formData.get(inputFields["week"]),
    state: formData.get(inputFields["state"]),
    weeklyTotalHours: formData.get(inputFields["weeklyTotalHours"]),
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
          totalHours: formData.get(inputFields[day]["totalHours"]) || null,
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
