import Box from "@mui/material/Box";
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
      <WeekOverviewTable
        draftTimesheets={JSON.parse(JSON.stringify(draftTimesheets))}
        finalTimesheets={JSON.parse(JSON.stringify(finalTimesheets))}
      />
    </Box>
  );
}
