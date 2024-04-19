"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function TimesheetInput({ day, data }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>{day}</AccordionSummary>
      <AccordionDetails>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date" name={day + "Date"} />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Start" name={day + "Start"} ampm={false} />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="End" name={day + "End"} ampm={false} />
        </LocalizationProvider>

        <TextField
          label="Tasks"
          name={day + "Task"}
          multiline
          fullWidth
          rows={4}
          value={data["data1"]}
        />
        <TextField
          label="How does it fit to project plan"
          name={day + "Fit"}
          multiline
          fullWidth
          rows={4}
        />
        <TextField
          label="Outcome/Next action"
          name={day + "Outcome"}
          multiline
          fullWidth
          rows={4}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default function TimesheetForm({ action, data }) {
  return (
    <Box component="form" action={action}>
      <TimesheetInput day="Mon" data={data}/>
      <TimesheetInput day="Tue" data={data}/>
      <TimesheetInput day="Wed" data={data}/>
      <TimesheetInput day="Thu" data={data}/>
      <TimesheetInput day="Fri" data={data}/>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
}
