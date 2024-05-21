import TimesheetFormTabs from "../../../../../../../components/TimesheetFormTabs";
import { getStudentTimesheets } from "../../../../../../../database/timesheet";
import { STATE } from "../../../../../../../const";

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
      studentId={params.id}
      draftTimesheets={JSON.parse(JSON.stringify(draftTimesheets))}
      finalTimesheets={JSON.parse(JSON.stringify(finalTimesheets))}
      readonly={true}
    />
  );
}
