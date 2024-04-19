import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import timesheetData from "../../database/timesheet";
import timesheetFormAction from "./actions";

export default function Layout() {
  const data = timesheetData();
  return <TimesheetFormTabs action={timesheetFormAction} data={data} />;
}
