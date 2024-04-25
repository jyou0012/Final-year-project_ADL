import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import timesheetFormAction from "./actions";
import { dbTimesheetGetByStudent } from "../../database/timesheet";

export default async function Layout() {

  return (
    <TimesheetFormTabs
      action={timesheetFormAction}
      dataWeeks={JSON.parse(JSON.stringify(await dbTimesheetGetByStudent({ student: "a1234567", type: "submission"})))}
    />
  );
}
