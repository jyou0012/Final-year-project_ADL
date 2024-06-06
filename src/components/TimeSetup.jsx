"use client";
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formAction } from "../app/staff/time/action";
import dayjs from "dayjs";

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography variant="h6" gutterBottom>Set Up Semester Time</Typography>
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
  );
}
