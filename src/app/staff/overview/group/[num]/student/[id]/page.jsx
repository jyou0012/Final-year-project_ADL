"use server";
import TimesheetFormTabs from "../../../../../../../components/TimesheetFormTabs";
import { getStudentTimesheets } from "../../../../../../../database/timesheet";
import { STATE } from "../../../../../../../const";

async function Action() {
  return null;
}

export default async function Page({ params }) {
  const draftTimesheets = await getStudentTimesheets({
    student: params.id,
    state: STATE.draft,
  });
  const finalTimesheets = await getStudentTimesheets({
    student: params.id,
    state: STATE.final,
  });

  return (
    <TimesheetFormTabs
      draftTimesheets={JSON.parse(JSON.stringify(draftTimesheets))}
      finalTimesheets={JSON.parse(JSON.stringify(finalTimesheets))}
      readonly={true}
    />
  );
}
