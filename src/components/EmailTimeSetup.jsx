"use client";

import { Fragment, useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import SchoolIcon from '@mui/icons-material/School';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, TextField, Button, Typography } from "@mui/material";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

# create by  
export default function EmailTimeSetup() {
  const [emailTime, setEmailTime] = useState('');
  const [currentSchedule, setCurrentSchedule] = useState('');
  const [formState, setFormState] = useState(null);

  useEffect(() => {
    const fetchCurrentScheduler = async () => {
      try {
        const response = await fetch('/api/scheduler');
        const result = await response.json();
        if (result.success) {
          setCurrentSchedule(result.cronSchedule);
        } else {
          console.error('Failed to fetch current scheduler:', result.error);
        }
      } catch (error) {
        console.error('Error fetching current scheduler:', error);
      }
    };
    fetchCurrentScheduler();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/scheduler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cronSchedule: emailTime }),
      });
      const result = await response.json();
      if (result.success) {
        setFormState('Schedule updated successfully');
        setCurrentSchedule(emailTime);
      } else {
        setFormState('Failed to update schedule');
      }
    } catch (error) {
      setFormState('Failed to update schedule');
      console.error('Error updating schedule:', error);
    }
  };

  return (
    <Fragment>
      <Grid container mx="5%" my="1%">
        <Grid item xs={2}>

          <Tabs
          	orientation="vertical"
		value={4}
          >
              <Tab iconPosition="start" icon={<SchoolIcon />} label="Import Students" value={2} sx={{justifyContent: "left"}}

                        onClick={() => {
                            window.location.href = "/staff/import";
                        }}
              />
              <Tab iconPosition="start" icon={<CalendarMonthIcon />} label="Setup Calendar" value={3} sx={{justifyContent: "left"}}
                        onClick={() => {
                            window.location.href = "/staff/time";
                        }}
              />
               <Tab iconPosition="start" icon={<AccessAlarmIcon />} label="Setup EmailTime" value={4} sx={{justifyContent: "left"}}
                        onClick={() => {
                            window.location.href = "/staff/emailtime";
                        }}
              />
          </Tabs>
        </Grid>
        <Grid item xs={8}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mx: "50px", my: "10px" }}>
            <Typography variant="h4" gutterBottom>Setup Email Time</Typography>
            <TextField
              label="Current Schedule"
              value={currentSchedule}
              readOnly
              fullWidth
              margin="normal"
            />
            <TextField
              label="New Email Schedule"
              value={emailTime}
              onChange={(e) => setEmailTime(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
            {formState && <Typography variant="body2" color="textSecondary" mt={2}>{formState}</Typography>}
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
}
