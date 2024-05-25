"use client";

import { Fragment, useState } from "react";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { BarChart } from "@mui/x-charts/BarChart";
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
            {groupTimesheets[group][week].totalHours}
          </TableCell>
        ))}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open} unmountOnExit>
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
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function GroupsOverviewTable({ groupTimesheets }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
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
          {Object.keys(groupTimesheets).map((group) => (
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
