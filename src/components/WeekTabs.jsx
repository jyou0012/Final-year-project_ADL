"use client";

import { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";

export default function WeekTabs({ children }) {
  const [selectedWeek, setWeek] = useState(1);

  const tabChange = (event, newWeek) => {
    setWeek(newWeek);
  };

  let weekTabs = [];
  let weekTabPanels = [];
  for (let week = 1; week <= 12; week++) {
    // Each child in a list should have a unique "key" prop:
    // https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
    weekTabs.push(<Tab label={"week " + week} value={week} key={week} />);
    weekTabPanels.push(
      <div key={week}>{week === selectedWeek && children}</div>,
    );
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={2}>
        <Tabs orientation="vertical" onChange={tabChange} value={selectedWeek}>
          {weekTabs}
        </Tabs>
      </Grid>
      <Grid item xs={9}>
        {weekTabPanels}
      </Grid>
    </Grid>
  );
}
