"use client";

import { Fragment, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { weeks, weekdays } from "../const";

export default function StudentOverviewTabs({
  studentId,
  draftTimesheets,
  finalTimesheets,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log(finalTimesheets);

  const paramWeek = searchParams.get("week");

  const [selectedWeek, setWeek] = useState(
    weeks.includes(paramWeek) ? paramWeek : weeks[0],
  );

  const tabChange = (event, newWeek) => {
    setWeek(newWeek);
    router.push(`/staff/overview/group/0/student/${studentId}?week=${newWeek}`);
  };

  return (
    <Fragment>
      <Grid container mx="5%">
        <Grid item xs={1}>
          <Tabs
            orientation="vertical"
            onChange={tabChange}
            value={selectedWeek}
          >
            {weeks.map((week) => (
              <Tab key={week} label={week} value={week} />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={9}>
          {weeks.map(
            (week) =>
              week === selectedWeek &&
              weekdays.map((day) => (
                <Card key={week}>
                  <CardHeader
                    title={
                      day +
                      " " +
                      (week in finalTimesheets &&
                      finalTimesheets[week][day].date
                        ? finalTimesheets[week][day].date + " "
                        : " ") +
                      (week in finalTimesheets &&
                      finalTimesheets[week][day].start
                        ? finalTimesheets[week][day].start + " - "
                        : " ") +
                      (week in finalTimesheets && finalTimesheets[week][day].end
                        ? finalTimesheets[week][day].end
                        : "")
                    }
                  />
                  <CardContent>
                    <Typography>
                      Task:{" "}
                      {selectedWeek in finalTimesheets
                        ? finalTimesheets[week][day].task
                        : null}
                    </Typography>
                    <Typography>
                      Fit:{" "}
                      {selectedWeek in finalTimesheets
                        ? finalTimesheets[week][day].fit
                        : null}
                    </Typography>
                    <Typography>
                      Outcome:{" "}
                      {selectedWeek in finalTimesheets
                        ? finalTimesheets[week][day].outcome
                        : null}
                    </Typography>
                  </CardContent>
                </Card>
              )),
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}
