"use client";

import dayjs from "dayjs";
import { Fragment, useState } from "react";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import StatusIndicator from "./Indicator";
import { weeks, weekdays, STATE } from "../const";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);


function WeekTableRow({ student, draftTimesheets, finalTimesheets }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open2 = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);

  return (
    <Fragment>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={open2}
          onClose={handleClose}
        >
          <ListItemText
            primary={"Name:"}
            secondary={student.name}
            sx={{ width: "120px", px: 2 }}
          />
          <ListItemText primary={"ID:"} secondary={student.id} sx={{ px: 2 }} />
          <ListItemText
            primary={"Group:"}
            secondary={student.group}
            sx={{ px: 2 }}
          />
          <ListItemText
            primary={"Client:"}
            secondary={student.client}
            sx={{ px: 2 }}
          />
          <ListItemText
            primary={"Email:"}
            secondary={student.email}
            sx={{ px: 2 }}
          />

        </Menu>

      <TableRow>
        <TableCell rowSpan="2">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell rowSpan="2" onClick={handleMenu}>{student}</TableCell>
        <TableCell><b>{STATE.draft}</b></TableCell>
        {weeks.map((week) => (
          <TableCell key={week}>
            <Link
              href={`/staff/overview/group/0/student/${student}?week=${week}`}
            >
              <StatusIndicator completed={week in draftTimesheets[student]} />
            </Link>
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell><b>{STATE.final}</b></TableCell>
        {weeks.map((week) => (
          <TableCell key={week}>
            <Link
              href={`/staff/overview/group/0/student/${student}?week=${week}`}
            >
              <StatusIndicator completed={week in finalTimesheets[student]} />
            </Link>
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open} unmountOnExit>

<Stack direction="row" spacing={2} sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <BarChart
              series={weekdays.map((day) => ({
                data: weeks.map((week) => week in finalTimesheets[student] ? finalTimesheets[student][week][day].totalHours : 0,
                ),
                stack: "A",
                label: day,
              }))}
              xAxis={[{ scaleType: "band", data: weeks.map((week) => week) }]}
              height={300}
              width={800}
            />

                        <PieChart
  series={[
    {
      data: weeks.map((week) => week in finalTimesheets[student] ? {value: finalTimesheets[student][week].weeklyTotalHours, label: week} : {value: 0, label: week})

    },
  ]}
  width={700}
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

export default function WeekOverviewTable({
  draftTimesheets,
  finalTimesheets,
}) {
  const [open, setOpen] = useState(false);

  console.log(222, finalTimesheets)
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" sx={{ mt: "1%" }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Student</TableCell>
              <TableCell>State</TableCell>
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
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
</TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open}  unmountOnExit>
<Stack direction="row" spacing={2}>

<LineChart
   series={Object.keys(finalTimesheets).map((student) => (
                { data: weeks.map(
                  (week) => week in finalTimesheets[student] ? finalTimesheets[student][week]["weeklyTotalHours"] : 0,
                ),
                label: student,
              }))}
   xAxis={[{ scaleType: "band", data: weeks.map((week) => week) }]}

  width={800}
  height={300}
/>
            <PieChart
  series={[
    {
      data: Object.keys(finalTimesheets).map((student) => ({
	value: finalTimesheets[student]["studentTotalHours"] || 0,
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



            {Object.keys(draftTimesheets).map((student) => (
              <WeekTableRow
                key={student}
                student={student}
                draftTimesheets={draftTimesheets}
                finalTimesheets={finalTimesheets}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
