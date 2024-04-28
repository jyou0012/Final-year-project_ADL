import React from 'react';
import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import StudentInfoBar from '../../components/StudentInfoBar';
import  timesheetFormAction  from './actions';
import { dbTimesheetGetByStudent, processTimesheets } from "../../database/timesheet";


export default async function Layout() {

  return (
    <div>
    <StudentInfoBar/>
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
    </div>
  );
}
