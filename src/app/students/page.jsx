import WeekTabs from "../../components/WeekTabs";
import TimesheetForm from "../../components/TimesheetForm";
import timesheetFormAction from "./actions";

export default function Layout() {
  return (
    <WeekTabs>
      <TimesheetForm action={timesheetFormAction} />
    </WeekTabs>
  );
}
