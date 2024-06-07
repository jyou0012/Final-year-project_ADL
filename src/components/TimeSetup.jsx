"use client";

import { Fragment, useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import SchoolIcon from '@mui/icons-material/School';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, TextField, Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formAction } from "../app/staff/time/action";
import dayjs from "dayjs";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

export default function TimeSetup() {
  const [semesterName, setSemesterName] = useState("");
  const [semesterStart, setSemesterStart] = useState(null);
  const [semesterEnd, setSemesterEnd] = useState(null);
  const [middleBreakStart, setMiddleBreakStart] = useState(null);
  const [middleBreakEnd, setMiddleBreakEnd] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      semesterName,
      semesterStart: semesterStart ? semesterStart.format("YYYY-MM-DD") : "",
      semesterEnd: semesterEnd ? semesterEnd.format("YYYY-MM-DD") : "",
      middleBreakStart: middleBreakStart ? middleBreakStart.format("YYYY-MM-DD") : "",
      middleBreakEnd: middleBreakEnd ? middleBreakEnd.format("YYYY-MM-DD") : "",
    };
    console.log(data);

    // 发送数据到API端点
    const result = await formAction(data);
    if (result.success) {
      alert('Semester info saved successfully');
    } else {
      alert('Failed to save semester info');
    }
  };

  return (
	<Fragment>
      <Grid container mx="5%" my="1%">
        <Grid item xs={2}>
          <Tabs
          	orientation="vertical"
		value={3}
          >
              <Tab iconPosition="start" icon={<PersonPinIcon />} label="Profile" value={1} sx={{"justify-content": "left"}}
                        onClick={() => {
                            window.location.href = "/staff/profile";
                        }}
              />
              <Tab iconPosition="start" icon={<SchoolIcon />} label="Import Students" value={2} sx={{"justify-content": "left"}}

                        onClick={() => {
                            window.location.href = "/staff/import";
                        }}
              />
              <Tab iconPosition="start" icon={<CalendarMonthIcon />} label="Setup Calendar" value={3} sx={{"justify-content": "left"}}
                        onClick={() => {
                            window.location.href = "/staff/time";
                        }}
              />
               <Tab iconPosition="start" icon={<AccessAlarmIcon />} label="Setup EmailTime" value={4} sx={{"justify-content": "left"}}
                        onClick={() => {
                            window.location.href = "/staff/emailtime";
                        }}
              />
          </Tabs>
        </Grid>
        <Grid item xs={8}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mx: "50px", my: "10px"}}>
        <Typography variant="h4" gutterBottom>Setup Calendar</Typography>
        <TextField
          label="Semester Name"
          value={semesterName}
          onChange={(e) => setSemesterName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <DatePicker
          label="Semester Start"
          value={semesterStart}
          onChange={(newValue) => setSemesterStart(newValue)}
          slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
        />
        <DatePicker
          label="Semester End"
          value={semesterEnd}
          onChange={(newValue) => setSemesterEnd(newValue)}
          slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
        />
        <DatePicker
          label="Middle Break Start"
          value={middleBreakStart}
          onChange={(newValue) => setMiddleBreakStart(newValue)}
          slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
        />
        <DatePicker
          label="Middle Break End"
          value={middleBreakEnd}
          onChange={(newValue) => setMiddleBreakEnd(newValue)}
          slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
        </Grid>
      </Grid>
    </Fragment>
  );
}
