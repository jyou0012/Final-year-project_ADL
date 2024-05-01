"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function StaffInfoBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 22 }}>
          Timesheet Dashboard
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Staff: Dr.Cruz
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
