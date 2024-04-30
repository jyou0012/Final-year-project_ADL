import React, { useState, useEffect } from "react";
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
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";
import { weekdays, inputFields } from "../const";

dayjs.extend(weekday);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  weekStart: 1,
});

function TimesheetInput({ week, day, data }) {}

export default function TimesheetForm({ week, action, dataDays }) {
  const [dates, setDates] = useState(Array(5).fill(null));
  const [expanded, setExpanded] = useState(Array(5).fill(false)); // State for each day's expansion

  useEffect(() => {
    const today = dayjs().weekday();
    const startOfWeek = dayjs()
      .startOf("week")
      .add(today - 1, "day");
    const newDates = [];
    for (let i = 0; i < 5; i++) {
      newDates.push(startOfWeek.add(i, "day"));
    }
    setDates(newDates);
    setExpanded((prev) => prev.map((_, index) => index === today - 1)); // Expand today's Accordion
  }, []);

  const handleDateChange = (newValue, index) => {
    const newDates = [...dates];
    if (newValue) {
      const selectedDate = dayjs(newValue);
      for (let i = 0; i < 5; i++) {
        newDates[i] = selectedDate.add(i, "day");
      }
    }
    setDates(newDates);
    setExpanded((prev) => prev.map((_, i) => i === index)); // Expand the selected day's Accordion
  };

  return (
    <Box component="form" action={action}>
      <Input
        name={inputFields["week"]}
        value={week}
        type="hidden"
        sx={{ display: "none" }}
      />
      {weekdays.map((day, index) => (
        <Accordion
          key={day}
          expanded={expanded[index]}
          onChange={() =>
            setExpanded((prev) => prev.map((ex, i) => (i === index ? !ex : ex)))
          }
        >
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
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Start"
                name={inputFields[day]["start"]}
                ampm={false}
                renderInput={(params) => <TextField {...params} />}
                sx={{ ml: 1 }} // Add margin to separate from Date
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="End"
                name={inputFields[day]["end"]}
                ampm={false}
                renderInput={(params) => <TextField {...params} />}
                sx={{ ml: 1 }} // Add margin to separate from Start
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
                  defaultValue={
                    day in dataDays ? dataDays[day]["outcome"] : null
                  }
                  variant="outlined"
                  sx={{ my: 1 }}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          sx={{ mr: 2 }}
          variant="contained"
          type="submit"
          name="actionType"
          value="draft"
        >
          Save Draft
        </Button>
        <Button
          sx={{ mr: 2 }}
          variant="contained"
          type="submit"
          name="actionType"
          value="submission"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
