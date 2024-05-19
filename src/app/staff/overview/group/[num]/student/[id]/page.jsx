import StudentOverviewTabs from "../../../../../../../components/StudentOverviewTabs";
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
    <StudentOverviewTabs
      studentId={params.id}
      draftTimesheets={JSON.parse(JSON.stringify(draftTimesheets))}
      finalTimesheets={JSON.parse(JSON.stringify(finalTimesheets))}
    />
  );
}
