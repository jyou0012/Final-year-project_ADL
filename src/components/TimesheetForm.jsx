import dayjs from "dayjs";
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
import weekday from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";
import ProgressStepper from "./ProgressStepper";
import {
  weekdays,
  inputFields,
  STATE,
  getCurrentWeek,
  SEMESTER_START_DATE,
  SEMESTER_BREAKS,
  weeks,
} from "../const";

dayjs.extend(weekday);

const calculateStartDateForWeek = (weekNumber, startDate, breaks) => {
  let start = dayjs(startDate);
  let totalDaysToAdd = 0;

  breaks.sort((a, b) => (dayjs(a.start).isAfter(dayjs(b.start)) ? 1 : -1));

  let effectiveStartDate = start;

  for (let currentWeek = 1; currentWeek <= weekNumber; currentWeek++) {
    let weekStart = effectiveStartDate.add(totalDaysToAdd, "days");

    breaks.forEach((breakPeriod) => {
      const breakStart = dayjs(breakPeriod.start);
      const breakEnd = dayjs(breakPeriod.end);

      if (weekStart.isBetween(breakStart, breakEnd, null, "[]")) {
        totalDaysToAdd += breakEnd.diff(weekStart, "days") + 1;
      }
    });

    if (currentWeek < weekNumber) {
      totalDaysToAdd += 7;
    }
  }

  return start.add(totalDaysToAdd, "days");
};

export default function TimesheetForm({
  week,
  action,
  draftTimesheet,
  finalTimesheet,
  readonly,
}) {
  if (finalTimesheet) {
    var state = STATE.final;
    var dataDays = finalTimesheet;
  } else if (draftTimesheet) {
    var state = STATE.draft;
    var dataDays = draftTimesheet;
  } else {
    var state = STATE.empty;
    var dataDays = null;
  }

  console.log(333, dataDays);
  const [dates, setDates] = useState(Array(5).fill(null));
  const [startTimes, setStartTimes] = useState(Array(5).fill(null));
  const [endTimes, setEndTimes] = useState(Array(5).fill(null));
  const [totalHours, setTotalHours] = useState(Array(5).fill("0.00"));
  const [expanded, setExpanded] = useState(Array(5).fill(false));

  useEffect(() => {
    if (dataDays) {
      const newDates = weekdays.map(day =>
        dataDays[day].date ? dayjs(dataDays[day].date, "DD/MM/YYYY") : null
      );
      const newStartTimes = weekdays.map(day =>
        dataDays[day].start ? dayjs(dataDays[day].date + " " + dataDays[day].start, "DD/MM/YYYY HH:mm") : null
      );
      const newEndTimes = weekdays.map(day =>
        dataDays[day].end ? dayjs(dataDays[day].date + " " + dataDays[day].end, "DD/MM/YYYY HH:mm") : null
      );
      setDates(newDates);
      setStartTimes(newStartTimes);
      setEndTimes(newEndTimes);
      newStartTimes.forEach((startTime, index) => calculateTotalHours(index, startTime, newEndTimes[index]));
    }
  }, [dataDays]);

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
      calculateTotalHours(index, newValue, endTimes[index]);
    } else {
      const newEndTimes = [...endTimes];
      newEndTimes[index] = newValue;
      setEndTimes(newEndTimes);
      calculateTotalHours(index, startTimes[index], newValue);
    }
  };

  const calculateTotalHours = (index, start, end) => {
    if (start && end) {
      const hours = dayjs(end).diff(dayjs(start), "hour", true);
      const newTotalHours = [...totalHours];
      newTotalHours[index] = hours.toFixed(2);
      setTotalHours(newTotalHours);
    }
  };

  return (
    <Fragment>
      <Box my="2%" px="25%">
        <ProgressStepper
          draftUpdatedTime={draftTimesheet ? draftTimesheet.updatedTime : null}
          finalUpdatedTime={finalTimesheet ? finalTimesheet.updatedTime : null}
        />
      </Box>
      <Box my="2%" component="form" action={action}>
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
                  value={
                    dates[index]
                  }
                  shouldDisableDate={(date) => date.weekday() !== index + 1}
                  disabled={readonly}
                  format="DD/MM/YYYY"
                  onChange={(newValue) => handleDateChange(newValue, index)}
                />
                <TimePicker
                  label="Start"
                  name={inputFields[day]["start"]}
                  ampm={false}
                  value={
                    startTimes[index]
                  }
                  onChange={(newValue) => handleTimeChange(newValue, index, true)}
                  disabled={readonly}
                  sx={{ ml: 1 }} // Add margin to separate from Date
                />
                <TimePicker
                  label="End"
                  name={inputFields[day]["end"]}
                  ampm={false}
                  value={
                    endTimes[index]
                  }
                  onChange={(newValue) => handleTimeChange(newValue, index, false)}
                  disabled={readonly}
                  sx={{ ml: 1 }} // Add margin to separate from Start
                />
                <TextField
                  label="Total Hours"
                  value={totalHours[index]}
                  InputProps={{ readOnly: true }}
                  disabled={readonly}
                  sx={{ ml: 1 }} // Add margin to separate from End
                />
              </LocalizationProvider>

              <TextField
                label="Tasks"
                name={inputFields[day]["task"]}
                disabled={readonly}
                multiline
                fullWidth
                rows={4}
                defaultValue={dataDays ? dataDays[day].task : null}
                variant="outlined"
                sx={{ my: 1 }}
              />
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1, mr: 1 }}>
                  <TextField
                    label="How does it fit to project plan"
                    name={inputFields[day]["fit"]}
                    disabled={readonly}
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue={dataDays ? dataDays[day].fit : null}
                    variant="outlined"
                    sx={{ my: 1 }}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <TextField
                    label="Outcome/Next action"
                    name={inputFields[day]["outcome"]}
                    disabled={readonly}
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue={dataDays ? dataDays[day].outcome : null}
                    variant="outlined"
                    sx={{ my: 1 }}
                  />
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
        {readonly === false && (
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
            <TextField
              label="Weekly Total Hours"
              value={totalHours.reduce((acc, curr) => acc + parseFloat(curr), 0).toFixed(2)}
              InputProps={{ readOnly: true }}
              sx={{ width: 150, mt: 2 }}
              size="small"
            />
            <Box>
              {state == STATE.empty && (
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
              {state == STATE.draft && (
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
              {state == STATE.draft && (
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
        )}
      </Box>
    </Fragment>
  );
}
