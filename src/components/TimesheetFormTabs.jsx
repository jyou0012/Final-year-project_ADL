"use client";

import { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import TimesheetForm from "./TimesheetForm";
import { weeks } from "../const";

export default function TimesheetFormTabs({ action, dataWeeks }) {
  const [selectedWeek, setWeek] = useState(weeks[0]);

  const tabChange = (event, newWeek) => {
    setWeek(newWeek);
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={2}>
        <Tabs orientation="vertical" onChange={tabChange} value={selectedWeek}>
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
                action={action}
                dataDays={dataWeeks[week] || {}}
              />
            ),
        )}
      </Grid>
    </Grid>
  );
}
