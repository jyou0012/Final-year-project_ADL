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

export default function TimesheetForm({ week, action, dataDays }) {
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
              label="Task"
              name={inputFields[day]["task"]}
              multiline
              fullWidth
              rows={4}
              defaultValue={day in dataDays ? dataDays[day]["task"] : null}
            />
            <TextField
              label="How does it fit to project plan"
              name={inputFields[day]["fit"]}
              multiline
              fullWidth
              rows={4}
              defaultValue={day in dataDays ? dataDays[day]["fit"] : null}
            />
            <TextField
              label="Outcome/Next action"
              name={inputFields[day]["outcome"]}
              multiline
              fullWidth
              rows={4}
              defaultValue={day in dataDays ? dataDays[day]["outcome"] : null}
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
