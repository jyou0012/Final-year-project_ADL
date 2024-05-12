"use client";

import { useState, useEffect, Fragment } from "react";
import { useFormState } from "react-dom";
import { useRouter, useSearchParams } from 'next/navigation'
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Fade from '@mui/material/Fade';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TimesheetForm from "./TimesheetForm";
import ProgressStepper from "./ProgressStepper";
import { weeks } from "../const";

export default function TimesheetFormTabs({ action, draftTimesheets, finalTimesheets }) {
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={formState ? true : false}
      >
    <Card sx={{ maxWidth: 480 }}>
      <CardContent>
        <Alert severity="success">{formState}</Alert>
    <Box my="5%" px="10%">
      <ProgressStepper
        draftUpdatedTime={selectedWeek in draftTimesheets ? draftTimesheets[selectedWeek].updatedTime : null}
        finalUpdatedTime={selectedWeek in finalTimesheets ? finalTimesheets[selectedWeek].updatedTime : null}
      />
    </Box>
        <Typography gutterBottom variant="h5" component="div">
        </Typography>
        <Typography variant="body2" color="text.secondary">
        </Typography>
      </CardContent>
      <CardActions  sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="small" onClick={() => {window.location.reload()}}>Confirm</Button>
      </CardActions>
    </Card>

      </Backdrop>
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
                  dataDays={week in finalTimesheets ? finalTimesheets[week] : week in draftTimesheets ? draftTimesheets[week] : {}}
                  draftTimesheet={week in draftTimesheets ? draftTimesheets[week] : null}
                  finalTimesheet={week in finalTimesheets ? finalTimesheets[week] : null}
                />
              ),
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}
