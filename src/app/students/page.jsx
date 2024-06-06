import { Fragment } from "react";
import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import timesheetFormAction from "./actions";
import { getStudentTimesheets } from "../../database/timesheet";
import { verifySession } from "../../session";
import { STATE } from "../../const";
import { getStudent, getAllStudentWeeklyHours } from "../../database/student";

export default async function Layout() {
  const session = await verifySession("student");
  const studentId = session.userId;

  // 获取当前学生信息
  const currentStudent = await getStudent(studentId);
  const group = currentStudent.group;

  const draftTimesheets = await getStudentTimesheets({
    student: studentId,
    state: STATE.draft,
  });
  const finalTimesheets = await getStudentTimesheets({
    student: studentId,
    state: STATE.final,
  });

  const weeklyHoursData = await getAllStudentWeeklyHours(group);

  console.log(111, draftTimesheets);
  console.log(122, finalTimesheets);

  return (
    <Fragment>
      <TimesheetFormTabs
        action={timesheetFormAction}
        draftTimesheets={JSON.parse(JSON.stringify(draftTimesheets))}
        finalTimesheets={JSON.parse(JSON.stringify(finalTimesheets))}
        readonly={false}
      />
    </Fragment>
  );
}
