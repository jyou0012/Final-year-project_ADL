import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledBreadcrumb from "../../../components/StyledBreadcrumb";
import GroupsOverviewTable from "../../../components/GroupsOverviewTable";
import { getGroupsTimesheets } from "../../../database/timesheet";
import { STATE } from "../../../const";

export default async function Page() {
  const groupTimesheets = await getGroupsTimesheets({ state: STATE.final });
  console.log(groupTimesheets);
  return (
    <Box sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb label="Overview" />
      </Breadcrumbs>
      <GroupsOverviewTable groupTimesheets={groupTimesheets} />
    </Box>
  );
}
