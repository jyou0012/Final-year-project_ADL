"use client";

import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TimePicker, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import updateLocale from 'dayjs/plugin/updateLocale';
import { weekdays, inputFields } from "../const";
import { timesheetFormAction, timesheetFormDraft } from '../app/students/actions';

dayjs.extend(weekday);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekStart: 1
});

export default function TimesheetForm({ week, action, dataDays }) {
  const [dates, setDates] = useState(Array(5).fill(null));

  useEffect(() => {
    if (week) {
      const startOfWeek = dayjs(week).startOf('week').add(1, 'day'); 
      const newDates = [];
      for (let i = 0; i < 5; i++) {
        newDates.push(startOfWeek.add(i, 'day'));
      }
      setDates(newDates);
    }
  }, [week]);

  const handleDateChange = (newValue, index) => {
    const newDates = [...dates];
    if (newValue) {
      const selectedDate = dayjs(newValue);
      for (let i = 0; i < 5; i++) {
        newDates[i] = selectedDate.add(i, 'day');
      }
    }
    setDates(newDates);
  };

  const handleSaveDraft = async (event) => {
    event.preventDefault(); // Prevent the default form action
    
    // Create a new FormData object passing the form as a parameter
    const formData = new FormData(event.currentTarget.parentElement); // Assumed that the button is a direct child of the form

    try {
        await timesheetFormDraft(formData); // For saving drafts
    } catch (error) {
        console.error('Failed to save draft:', error);
    }
};
 
  return (
    <Box component="form" action={action}>
      <Input name={inputFields["week"]} value={week} type="hidden" />
      {weekdays.slice(0, 5).map((day, index) => (
        <Accordion key={day}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {day}
          </AccordionSummary>
          <AccordionDetails>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                name={inputFields[day]["date"]}
                renderInput={(params) => <TextField {...params} />}
                value={dates[index]}
                onChange={(newValue) => handleDateChange(newValue, index)}
                shouldDisableDate={(date) => date.weekday() !== index}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Start"
                name={inputFields[day]["start"]}
                ampm={false}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="End"
                name={inputFields[day]["end"]}
                ampm={false}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              label="Tasks"
              name={inputFields[day]["task"]}
              multiline
              fullWidth
              rows={4}
              defaultValue={day in dataDays ? dataDays[day]["task"] : null}
              variant="outlined"
              sx={{ my: 1 }}
            />
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flexGrow: 1, mr: 1 }}>
                <TextField
                  label="How does it fit to project plan"
                  name={inputFields[day]["fit"]}
                  multiline
                  fullWidth
                  rows={4}
                  defaultValue={day in dataDays ? dataDays[day]["fit"] : null}
                  variant="outlined"
                  sx={{ my: 1 }}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  label="Outcome/Next action"
                  name={inputFields[day]["outcome"]}
                  multiline
                  fullWidth
                  rows={4}
                  defaultValue={day in dataDays ? dataDays[day]["outcome"] : null}
                  variant="outlined"
                  sx={{ my: 1 }}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      <Button variant="contained" type="submit">
        Submit
      </Button>
      <Button variant="contained" onClick={handleSaveDraft}>
        Save Draft
      </Button>
    </Box>
  );
}
