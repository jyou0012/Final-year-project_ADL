"use client";

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
import StatusIndicator from "./Indicator";
import { weeks } from "../const";

function WeekTableRow() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>Bob</TableCell>
        <TableCell>
          <StatusIndicator completed={true} />
          <StatusIndicator />
        </TableCell>
        <TableCell>1 0</TableCell>
        <TableCell>1 1</TableCell>
        <TableCell>0 0</TableCell>
        <TableCell>1 1</TableCell>
        <TableCell>1 0</TableCell>
        <TableCell>1 1</TableCell>
        <TableCell>0 0</TableCell>
        <TableCell>1 1</TableCell>
        <TableCell>1 0</TableCell>
        <TableCell>1 1</TableCell>
        <TableCell>0 0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open} unmountOnExit>
            abc
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function WeekOverviewTable() {
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
          <WeekTableRow />
          <WeekTableRow />
          <WeekTableRow />
          <WeekTableRow />
          <WeekTableRow />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
