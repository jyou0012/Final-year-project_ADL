"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function StudentInfoBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 22 }}>
          Timesheet Form
        </Typography>
        <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
          Name: Bob
        </Typography>
        <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
          ID: a1234567
        </Typography>
        <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
          Group: 1
        </Typography>
        <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
          Client: Dr. Cruz
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
