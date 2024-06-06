"use server";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledBreadcrumb from "../../../../../../../components/StyledBreadcrumb";
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
    <Box sx={{ p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: "16px" }}>
        <StyledBreadcrumb
          component="a"
          href="/staff/overview"
          label="Overview"
        />
        <StyledBreadcrumb
          component="a"
          label={`Group ${params.num}`}
          href={`/staff/overview/group/${params.num}`}
        />
        <StyledBreadcrumb label={`Student ${params.id}`} />
      </Breadcrumbs>
      <TimesheetFormTabs
        draftTimesheets={JSON.parse(JSON.stringify(draftTimesheets))}
        finalTimesheets={JSON.parse(JSON.stringify(finalTimesheets))}
        readonly={true}
      />
    </Box>
  );
}
