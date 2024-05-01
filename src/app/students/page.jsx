import React from "react";
import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import timesheetFormAction from "./actions";
import {
  dbTimesheetGetByStudent,
  processTimesheets,
} from "../../database/timesheet";

export default async function Layout() {
  return (
    <div>
      <TimesheetFormTabs
        action={timesheetFormAction}
        dataWeeks={JSON.parse(
          JSON.stringify(await processTimesheets({ student: "a1234567" })),
        )}
      />
    </div>
  );
}
