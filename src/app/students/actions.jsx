"use server";

import { dbTimesheetUpsert } from "../../database/timesheet";

export default async function timesheetFormAction(formData) {
  dbTimesheetUpsert(formData);
}
