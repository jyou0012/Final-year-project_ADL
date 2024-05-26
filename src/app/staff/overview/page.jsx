import GroupsOverviewTable from "../../../components/GroupsOverviewTable";
import { getGroupsTimesheets } from "../../../database/timesheet";
import { STATE } from "../../../const";

export default async function Page() {
  const groupTimesheets = await getGroupsTimesheets({ state: STATE.final });
  console.log(groupTimesheets);
  return <GroupsOverviewTable groupTimesheets={groupTimesheets} />;
}
