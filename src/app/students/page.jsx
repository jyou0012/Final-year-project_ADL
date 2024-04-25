import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import timesheetFormAction from "./actions";
import { dbTimesheetGet } from "../../database/timesheet";
import { weeks } from "../../const";

export default async function Layout() {
  const data = await dbTimesheetGet(weeks[0]);
  console.log(data);
  return (
    <TimesheetFormTabs
      action={timesheetFormAction}
      data={JSON.parse(JSON.stringify(data))}
    />
  );
}
