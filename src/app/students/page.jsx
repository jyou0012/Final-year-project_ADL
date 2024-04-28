import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import  timesheetFormAction  from './actions';
import { dbTimesheetGetByStudent,processTimesheets } from "../../database/timesheet";


export default async function Layout() {

  return (
    <TimesheetFormTabs
      action={timesheetFormAction}
      dataWeeks={JSON.parse(
        JSON.stringify(
          await processTimesheets(
             {student: "a1234567"}            
          ),
        ),
      )}
    />
  );
}
