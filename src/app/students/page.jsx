import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import { timesheetFormAction, timesheetFormDraft } from './actions';
import { dbTimesheetGetByStudent,dbTimesheetGetByStudentDraft } from "../../database/timesheet";


export default async function Layout() {
  let nType = "";
  if (dbTimesheetGetByStudentDraft({
    student: "a1234567",
    type: "draft"            
  }) != null) {
    nType = "draft";
  }else{
    nType = "submission"
  }
  return (
    <TimesheetFormTabs
      action={timesheetFormAction}
      dataWeeks={JSON.parse(
        JSON.stringify(
          await dbTimesheetGetByStudent({
            student: "a1234567",
            type: nType            
          }),
        ),
      )}
    />
  );
}
