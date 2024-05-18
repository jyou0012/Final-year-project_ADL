import Box from "@mui/material/Box";
import WeekOverviewTable from "../../components/WeekOverviewTable";
import { getWeekTimesheets } from "../../database/timesheet";
import { STATE } from "../../const";

export default async function Page() {
  const draftTimesheets = await getWeekTimesheets({ group: "0", state: STATE.draft})
  const finalTimesheets = await getWeekTimesheets({ group: "0", state: STATE.final})

  return (
    <Box sx={{ p: 2 }}>
      <WeekOverviewTable draftTimesheets={draftTimesheets} finalTimesheets={finalTimesheets} />
    </Box>
  )
}
