import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import timesheetFormAction from "./actions";

export default function Layout() {
<<<<<<< HEAD
  const data = timesheetData();
  return <TimesheetFormTabs action={timesheetFormAction} data={data} />;
=======
  return (
    <WeekTabs>
      <TimesheetForm action={timesheetFormAction} />
    </WeekTabs>
  );
>>>>>>> parent of 2774c8d (Create database)
}
