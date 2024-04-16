"use client";
import React, { useState, useEffect } from 'react';
import { useFormStatus, useFormState } from "react-dom";
import { formAction } from "./actions";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

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
  //for form submit
  const { pending } = useFormStatus();
  const [state, action] = useFormState(formAction, null);
  const [alertType, setAlertType] = useState(null);  // 新状态用于控制弹窗类型

  useEffect(() => {
    if (state === "form request received") {
      setAlertType('success');
    } else if (state === 0) {
      setAlertType('error');
    }else if (state === 1) {
      setAlertType('error');
    }else if (state === 2) {
      setAlertType('error');
    }
  }, [state]);



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
       <form action={action}>

       {alertType === 'success' && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success Alert with an encouraging title.
          </Alert>
        </Stack>
      )}
      {alertType === 'error' && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error Alert with a scary title.
        </Alert>
      )}




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
                        textField={(params) => (
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
          <Box display="flex" justifyContent="flex-end" >

          <button disabled={pending}
           variant="contained"
           color="primary"
           
           sx={{ mt: 2 }}
          >{pending ? "Submitting..." : "Submit"}
          </button>

          
          <Button disabled={pending}
           variant="contained"
           color="primary"
           
           sx={{ mt: 2 }}
          >{pending ? "Submitting..." : "Submit"}
          </Button>
           
          </Box>
        </Box>
      </Box>
      </form>
    </Container>
  );
}
