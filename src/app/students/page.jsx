import { Fragment } from "react";
import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import timesheetFormAction from "./actions";
import { dbTimesheetGet } from "../../database/timesheet";

export default async function Layout() {
  const data = await dbTimesheetGet({ student: "a1234567" });
  return (
    <Fragment>
      <TimesheetFormTabs
        action={timesheetFormAction}
        dataWeeks={JSON.parse(JSON.stringify(data))}
      />
    </Fragment>
  );
}
