import WeekTabs from "../../components/WeekTabs";
import TimesheetForm from "../../components/TimesheetForm";
import timesheetFormAction from "./actions";
import timesheetData from "../../database/timesheet";

export default function Layout() {
  const data = timesheetData();
  return (
    <WeekTabs>
      <TimesheetForm action={timesheetFormAction} data={data} />
    </WeekTabs>
  );
}
