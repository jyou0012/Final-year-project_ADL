import React from 'react';
import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import StudentInfoBar from '../../components/StudentInfoBar';  
import timesheetFormAction from "./actions";
import { dbTimesheetGetByStudent } from "../../database/timesheet";

export default async function Layout() {
  const studentData = await dbTimesheetGetByStudent({
    student: "a1234567",
    type: "submission",
  });

  return (
    <div>
      <StudentInfoBar/>
      <TimesheetFormTabs
        action={timesheetFormAction}
        dataWeeks={JSON.parse(JSON.stringify(studentData))}
      />
    </div>
  );
}
