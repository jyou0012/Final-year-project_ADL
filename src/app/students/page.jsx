"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Container,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Extend dayjs with custom parse format plugin
dayjs.extend(customParseFormat);

// Define weekdays and total number of weeks
const weekdays = ["MON", "TUE", "WED", "THU", "FRI"];
const totalWeeks = 12;

export default function Layout() {
  // State to keep track of the selected week
  const [selectedWeek, setSelectedWeek] = useState(0);
  // State to control the expansion of Accordion panels
  const [expanded, setExpanded] = useState(null);
  // State to store each week's data
  const [weeksData, setWeeksData] = useState(
    Array.from({ length: totalWeeks }, () =>
      weekdays.map(() => ({
        date: dayjs(),
        timeIn: "",
        timeOut: "",
        tasks: "",
        totalHours: "",
        plan: "",
        action: "",
      })),
    ),
  );

  // Function to handle changes in Accordion panel state
  const handleAccordionChange = (index) => (_, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  // Function to handle field changes for each day's data
  const handleFieldChange = (weekIndex, dayIndex, field, value) => {
    const newWeeksData = weeksData.map((week, wIndex) =>
      wIndex === weekIndex
        ? week.map((day, dIndex) =>
            dIndex === dayIndex ? { ...day, [field]: value } : day,
          )
        : week,
    );
    setWeeksData(newWeeksData);
  };

  // Function to calculate total hours based on start and end times
  const calculateTotalHours = (timeIn, timeOut) => {
    if (dayjs(timeIn, "HH:mm").isValid() && dayjs(timeOut, "HH:mm").isValid()) {
      const hours = dayjs(timeOut, "HH:mm").diff(
        dayjs(timeIn, "HH:mm"),
        "hour",
        true,
      );
      return hours > 0 ? hours.toFixed(2) : "0";
    }
    return "";
  };

  // Function to handle save button click
  const handleSave = () => {
    console.log("Saving data", weeksData);
    // Add API call or other logic to save the data
  };

  // Function to handle submit button click
  const handleSubmit = () => {
    console.log("Submitting data", weeksData);
    // Add API call or other logic to submit the data
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", mt: 4 }}>
        <List sx={{ width: "15%", mr: 2 }}>
          {Array.from({ length: totalWeeks }, (_, i) => (
            <ListItem
              button
              key={i}
              selected={selectedWeek === i}
              onClick={() => setSelectedWeek(i)}
            >
              <ListItemText primary={`Week ${i + 1}`} />
            </ListItem>
          ))}
        </List>

        <Box sx={{ width: "85%" }}>
          <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
            MCI Project Weekly Time Sheet
          </Typography>

          {weeksData[selectedWeek].map((day, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleAccordionChange(index)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{weekdays[index]}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <DatePicker
                        label="Date"
                        value={day.date}
                        onChange={(newValue) =>
                          handleFieldChange(
                            selectedWeek,
                            index,
                            "date",
                            newValue,
                          )
                        }
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Start"
                        type="time"
                        value={day.timeIn}
                        onChange={(e) =>
                          handleFieldChange(
                            selectedWeek,
                            index,
                            "timeIn",
                            e.target.value,
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="End"
                        type="time"
                        value={day.timeOut}
                        onChange={(e) =>
                          handleFieldChange(
                            selectedWeek,
                            index,
                            "timeOut",
                            e.target.value,
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Total Hours"
                        value={calculateTotalHours(day.timeIn, day.timeOut)}
                        InputProps={{ readOnly: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Tasks"
                        multiline
                        value={day.tasks}
                        onChange={(e) =>
                          handleFieldChange(
                            selectedWeek,
                            index,
                            "tasks",
                            e.target.value,
                          )
                        }
                        fullWidth
                        margin="normal"
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="How does it fit to project plan"
                        multiline
                        value={day.plan}
                        onChange={(e) =>
                          handleFieldChange(
                            selectedWeek,
                            index,
                            "plan",
                            e.target.value,
                          )
                        }
                        fullWidth
                        margin="normal"
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Outcome/Next action"
                        multiline
                        value={day.action}
                        onChange={(e) =>
                          handleFieldChange(
                            selectedWeek,
                            index,
                            "action",
                            e.target.value,
                          )
                        }
                        fullWidth
                        margin="normal"
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
              </AccordionDetails>
            </Accordion>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            sx={{ mt: 2, ml: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
