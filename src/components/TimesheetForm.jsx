import { useState, useEffect, Fragment } from "react";
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
import ProgressStepper from "./ProgressStepper";
import { weekdays, inputFields, STATE, getCurrentWeek, SEMESTER_START_DATE, SEMESTER_BREAKS, weeks } from "../const";

dayjs.extend(weekday);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  weekStart: 1,
});

const calculateStartDateForWeek = (weekNumber, startDate, breaks) => {
  let start = dayjs(startDate);
  let daysToAdd = (weekNumber - 1) * 7;

  breaks.forEach(breakPeriod => {
      const breakStart = dayjs(breakPeriod.start);
      const breakEnd = dayjs(breakPeriod.end);
      // Only adjust days if the week to be calculated is after the break ends
      if (start.add(daysToAdd, 'days').isAfter(breakEnd)) {
          daysToAdd += breakEnd.diff(breakStart, 'days') + 1;
      }
  });

  return start.add(daysToAdd, 'days');
};


export default function TimesheetForm({ week, action, dataDays }) {
  const [dates, setDates] = useState(Array(5).fill(null));
  const [startTimes, setStartTimes] = useState(Array(5).fill(null));
  const [endTimes, setEndTimes] = useState(Array(5).fill(null));
  const [totalHours, setTotalHours] = useState(Array(5).fill('0.00'));
  const [expanded, setExpanded] = useState(Array(5).fill(false));

  useEffect(() => {
    const weekNumber = weeks.indexOf(week) + 1;
    const startOfWeek = calculateStartDateForWeek(weekNumber, SEMESTER_START_DATE, SEMESTER_BREAKS);
    console.log("Start of Week:", startOfWeek.toString());

    const newDates = [];
    for (let i = 0; i < 5; i++) {
        const newDate = dayjs(startOfWeek).add(i, 'days');
        newDates.push(newDate);
        console.log("New Date for " + i + ":", newDate);
    }
    setDates(newDates);
  }, [week]); 

  const handleDateChange = (newValue, index) => {
    const newDates = [...dates];
    newDates[index] = newValue;
    setDates(newDates);
  };

  const handleTimeChange = (newValue, index, isStart) => {
    if (isStart) {
      const newStartTimes = [...startTimes];
      newStartTimes[index] = newValue;
      setStartTimes(newStartTimes);
    } else {
      const newEndTimes = [...endTimes];
      newEndTimes[index] = newValue;
      setEndTimes(newEndTimes);
    }
    calculateTotalHours(index);
  };

  const calculateTotalHours = (index) => {
    if (startTimes[index] && endTimes[index]) {
      const hours = dayjs(endTimes[index]).diff(dayjs(startTimes[index]), 'hour', true);
      const newTotalHours = [...totalHours];
      newTotalHours[index] = hours.toFixed(2);
      setTotalHours(newTotalHours);
    }
  };

  return (
    <Fragment>
      <Box my="2%" px="25%">
      <ProgressStepper
        draftUpdatedTime={dataDays["draftUpdatedTime"]}
        finalUpdatedTime={dataDays["finalUpdatedTime"]}
      />
      </Box>
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
              setExpanded((prev) =>
                prev.map((ex, i) => (i === index ? !ex : ex)),
              )
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
                <TimePicker
                  label="Start"
                  name={inputFields[day]["start"]}
                  ampm={false}
                  renderInput={(params) => <TextField {...params} />}
                  value={startTimes[index]}
                  onChange={(newValue) => handleTimeChange(newValue, index, true)}
                  sx={{ ml: 1 }} // Add margin to separate from Date
                />
                <TimePicker
                  label="End"
                  name={inputFields[day]["end"]}
                  ampm={false}
                  renderInput={(params) => <TextField {...params} />}
                  value={endTimes[index]}
                  onChange={(newValue) => handleTimeChange(newValue, index, false)}
                  sx={{ ml: 1 }} // Add margin to separate from Start
                />
                <TextField
                  label="Total Hours"
                  value={totalHours[index]}
                  InputProps={{ readOnly: true }}
                  sx={{ ml: 1 }} // Add margin to separate from End
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          {dataDays["state"] == STATE.empty && (
            <Button
              sx={{ mr: 2 }}
              variant="contained"
              type="submit"
              name={inputFields.state}
              value={STATE.draft}
            >
              Save Draft
            </Button>
          )}
          {dataDays["state"] == STATE.draft && (
            <Button
              sx={{ mr: 2 }}
              variant="contained"
              type="submit"
              name={inputFields.state}
              value={STATE.draft}
            >
              Edit Draft
            </Button>
          )}
          {dataDays["state"] == STATE.draft && (
            <Button
              sx={{ mr: 2 }}
              variant="contained"
              type="submit"
              name={inputFields.state}
              value={STATE.final}
            >
              Submit Final
            </Button>
          )}
        </Box>
      </Box>
    </Fragment>
  );
}

