"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import TimesheetForm from "./TimesheetForm";
import StateAlert from "./StateAlert";
import Box from "@mui/material/Box";
import { weeks } from "../const";

export default function TimesheetFormTabs({ action, dataWeeks }) {
  const [selectedWeek, setWeek] = useState(weeks[0]);
  const [formState, formAction] = useFormState(action, null);

  const tabChange = (event, newWeek) => {
    setWeek(newWeek);
  };

  return (
    <Box>
      <StateAlert>{formState}</StateAlert>
      <Grid container mx="5%">
        <Grid item xs={2}>
          <Tabs
            orientation="vertical"
            onChange={tabChange}
            value={selectedWeek}
          >
            {Array.from(weeks, (week) => (
              <Tab key={week} label={week} value={week} />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={9}>
          {Array.from(
            weeks,
            (week) =>
              week === selectedWeek && (
                <TimesheetForm
                  key={week}
                  week={week}
                  action={formAction}
                  dataDays={dataWeeks[week] || {}}
                />
              ),
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
