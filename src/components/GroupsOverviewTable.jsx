"use client";

import { Fragment, useState } from "react";
import { green, orange, red } from "@mui/material/colors";
import Box from '@mui/material/Box';
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from '@mui/material/Stack';
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { weeks, weekdays, STATE } from "../const";

function GroupsTableRow({ group, groupTimesheets }) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Link href={`/staff/overview/group/${group}`}>group {group}</Link>
        </TableCell>

        {weeks.map((week) => (
          <TableCell key={week}>
<Stack direction="row" spacing={2} sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
	<Box>
            {groupTimesheets[group][week].finalCount ===
            groupTimesheets[group][week].studentCount ? (
              <CheckCircleIcon sx={{ color: green[500] }} />
            ) : groupTimesheets[group][week].finalCount === 0 ? (
              <PublishedWithChangesIcon />
            ) : groupTimesheets[group][week].finalCount >
              groupTimesheets[group][week].studentCount / 2 ? (
              <VerifiedIcon sx={{ color: orange[500] }} />
            ) : (
              <UnpublishedIcon sx={{ color: red[500] }} />
            )}
	</Box>
	<Box>
            {groupTimesheets[group][week].finalCount} /{" "}
            {groupTimesheets[group][week].studentCount}
	</Box>
</Stack>
          </TableCell>
        ))}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open}  unmountOnExit>
<Stack direction="row" spacing={2}>
            <BarChart
              series={groupTimesheets[group]["students"].map((student) => ({
                data: weeks.map(
                  (week) => groupTimesheets[group][week][student] || 0,
                ),
                stack: "A",
                label: student,
              }))}
              xAxis={[{ scaleType: "band", data: weeks.map((week) => week) }]}
              height={300}
              width={800}
            />
            <PieChart
  series={[
    {
      data: groupTimesheets[group]["students"].map((student) => ({
	value: groupTimesheets[group]["studentTotalHours"][student],
	label: student,
	}))
    },
  ]}
  width={500}
  height={300}
sx={{ my: "50px" }}
/>
</Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function GroupsOverviewTable({ groupTimesheets }) {
  const [open, setOpen] = useState(false);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" sx={{ mt: "1%" }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Group</TableCell>
            {weeks.map((week) => (
              <TableCell key={week}>{week}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
	  <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
            <TableCell>
		ALL
            </TableCell>
        {weeks.map((week) => (
          <TableCell key={week}>
<Stack direction="row" spacing={2} sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
	<Box>
            {groupTimesheets["all"][week].finalCount ===
            groupTimesheets["all"].studentCount ? (
		<CheckCircleOutlineIcon sx={{ color: green[500] }} />
            ) : groupTimesheets["all"][week].finalCount === 0 ? (
		<PublishedWithChangesIcon />
            ) : groupTimesheets["all"][week].finalCount >
              groupTimesheets["all"].studentCount / 2 ? (
		<VerifiedIcon sx={{ color: orange[500] }} />
            ) : (
		<UnpublishedIcon sx={{ color: red[500]}} />
            )}
	</Box>
	<Box>
            {groupTimesheets["all"][week].finalCount} /{" "}
            {groupTimesheets["all"].studentCount}
        </Box>
</Stack>
          </TableCell>
        ))}
	  </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open}  unmountOnExit>
<Stack direction="row" spacing={2}>

<LineChart
   series={Object.keys(groupTimesheets).filter((key) => key !== "all").map((group) => (
                { data: weeks.map(
                  (week) =>  groupTimesheets[group][week]["groupWeeklyTotalHours"] || 0,
                ),
                label: `group ${group}`,
              }))}
   xAxis={[{ scaleType: "band", data: weeks.map((week) => week) }]}

  width={800}
  height={300}
/>
            <PieChart
  series={[
    {
      data: Object.keys(groupTimesheets).filter((key) => key !== "all").map((group) => ({
	value: groupTimesheets["all"][group] || 0,
	label: `group ${group}`,
	}))
    },
  ]}
  width={500}
  height={300}
sx={{ my: "50px" }}
/>
</Stack>
          </Collapse>
        </TableCell>
      </TableRow>

          {Object.keys(groupTimesheets).map((group) => (
	    group !== "all" &&
            <GroupsTableRow
              key={group}
              group={group}
              groupTimesheets={groupTimesheets}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
