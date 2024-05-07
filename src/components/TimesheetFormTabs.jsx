"use client";

import { useState, Fragment } from "react";
import { useFormState } from "react-dom";
import { useRouter, useSearchParams } from 'next/navigation'
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import TimesheetForm from "./TimesheetForm";
import StateAlert from "./StateAlert";
import { weeks } from "../const";

export default function TimesheetFormTabs({ action, dataWeeks }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const paramWeek = searchParams.get("week")

  const [selectedWeek, setWeek] = useState(weeks.includes(paramWeek) ? paramWeek : weeks[0]);
  const [formState, formAction] = useFormState(action, null);

  const tabChange = (event, newWeek) => {
    setWeek(newWeek);
    router.push("/students?week=" + newWeek)
  };

  return (
    <Fragment>
      <StateAlert>{formState}</StateAlert>
      <Grid container mx="5%">
        <Grid item xs={1}>
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
    </Fragment>
  );
}
