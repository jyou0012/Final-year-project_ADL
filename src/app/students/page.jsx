import { Fragment } from "react";
import TimesheetFormTabs from "../../components/TimesheetFormTabs";
import timesheetFormAction from "./actions";
import { getStudentTimesheets, checkDraftsAndSendEmails } from "../../database/timesheet";
import { STATE } from "../../const";

export default async function Layout() {
  const draftTimesheets = await getStudentTimesheets({ student: "a1234567", state: STATE.draft })
  const finalTimesheets = await getStudentTimesheets({ student: "a1234567", state: STATE.final })
  console.log(122, draftTimesheets)
//  await checkDraftsAndSendEmails(data);

  return (
    <Fragment>
      <TimesheetFormTabs
        action={timesheetFormAction}
        draftTimesheets={JSON.parse(JSON.stringify(draftTimesheets))}
        finalTimesheets={JSON.parse(JSON.stringify(finalTimesheets))}
      />
    </Fragment>
  );
}
