"use client";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
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
import { weekdays, inputFields } from "../const";

function TimesheetInput({ week, day, data }) {}

export default function TimesheetForm({ week, action, data }) {
  return (
    <Box component="form" action={action}>
      <Input name={inputFields["week"]} value={week} type="hidden" />
      {Array.from(weekdays, (day, dayIndex) => (
        <Accordion key={day}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {day}
          </AccordionSummary>
          <AccordionDetails>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date" name={inputFields[day]["date"]} />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Start"
                name={inputFields[day]["start"]}
                ampm={false}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="End"
                name={inputFields[day]["end"]}
                ampm={false}
              />
            </LocalizationProvider>

            <TextField
              label="Tasks"
              name={inputFields[day]["task"]}
              multiline
              fullWidth
              rows={4}
              defaultValue={data === null ? null : data[dayIndex]["task"]}
            />
            <TextField
              label="How does it fit to project plan"
              name={inputFields[day]["fit"]}
              multiline
              fullWidth
              rows={4}
              defaultValue={data === null ? null : data[dayIndex]["fit"]}
            />
            <TextField
              label="Outcome/Next action"
              name={inputFields[day]["outcome"]}
              multiline
              fullWidth
              rows={4}
              defaultValue={data === null ? null : data[dayIndex]["outcome"]}
            />
          </AccordionDetails>
        </Accordion>
      ))}
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
}
