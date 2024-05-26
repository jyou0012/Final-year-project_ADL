import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledBreadcrumb from "../../../../../components/StyledBreadcrumb";
import WeekOverviewTable from "../../../../../components/WeekOverviewTable";
import { getWeekTimesheets } from "../../../../../database/timesheet";
import { STATE } from "../../../../../const";

export default async function Page({ params }) {
  const draftTimesheets = await getWeekTimesheets({
    group: params.num,
    state: STATE.draft,
  });
  const finalTimesheets = await getWeekTimesheets({
    group: params.num,
    state: STATE.final,
  });

  return (
    <Box sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="/staff/overview"
          label="Overview"
        />
        <StyledBreadcrumb label={"Group " + params.num} />
      </Breadcrumbs>
      <WeekOverviewTable
        group={params.num}
        draftTimesheets={JSON.parse(JSON.stringify(draftTimesheets))}
        finalTimesheets={JSON.parse(JSON.stringify(finalTimesheets))}
      />
    </Box>
  );
}
