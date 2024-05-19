"use client";

import dayjs from "dayjs";
import { Fragment, useState } from "react";
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
import { BarChart } from '@mui/x-charts/BarChart';
import StatusIndicator from "./Indicator";
import { weeks, weekdays } from "../const";

function WeekTableRow({ student, draftTimesheets, finalTimesheets }) {
  const [open, setOpen] = useState(false);
  console.log(student, finalTimesheets[student])
  console.log(9999, dayjs(finalTimesheets['a1876736']['Week 1']['Mon'].date + " " + finalTimesheets['a1876736']['Week 1']['Mon'].end, "DD/MM/YYYY HH:mm").diff(dayjs(finalTimesheets['a1876736']['Week 1']['Mon'].date + " " + finalTimesheets['a1876736']['Week 1']['Mon'].start, "DD/MM/YYYY HH:mm"), "hour"))
  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{student}</TableCell>
	{weeks.map((week) => (
        <TableCell key={week}>
          <StatusIndicator completed={week in finalTimesheets[student]} />
          <StatusIndicator completed={week in draftTimesheets[student]} />
        </TableCell>
        ))
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open} unmountOnExit>
                <BarChart
      series={
        weekdays.map((day) => ({ data: weeks.map((week) => week in finalTimesheets[student] && finalTimesheets[student][week][day].end && finalTimesheets[student][week][day].start ? dayjs(finalTimesheets[student][week][day].date + " " + finalTimesheets[student][week][day].end, "DD/MM/YYYY HH:mm").diff(dayjs(finalTimesheets[student][week][day].date + " " + finalTimesheets[student][week][day].start, "DD/MM/YYYY HH:mm"), "hour")  : 0), stack: 'A', label: day }))
      }
      xAxis={[{scaleType: 'band', data: weeks.map((week) => week)}]}
      height={300}
      width={800}
    />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
//      xAxis={[{ data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], scaleType: 'band' }]}
//      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
}

export default function WeekOverviewTable({ draftTimesheets, finalTimesheets }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Student</TableCell>
            {weeks.map((week) => (
              <TableCell key={week}>{week}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
	  {Object.keys(draftTimesheets).map((student) => (
      <WeekTableRow key={student} student={student} draftTimesheets={draftTimesheets} finalTimesheets={finalTimesheets} />
          ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
