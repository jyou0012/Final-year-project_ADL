import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import { timesheetFormAction, timesheetFormDraft } from './actions';
import { dbTimesheetGetByStudent,dbTimesheetGetByStudentDraft } from "../../database/timesheet";


export default async function Layout() {

  return (
    <TimesheetFormTabs
      action={timesheetFormAction}
      dataWeeks={JSON.parse(
        JSON.stringify(
          await dbTimesheetGetByStudent({
            student: "a1234567"            
          }),
        ),
      )}
    />
  );
}
