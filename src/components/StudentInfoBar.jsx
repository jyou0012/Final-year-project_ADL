"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

export default function StudentInfoBar({ student }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "http://localhost:3000";
    handleClose();
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Timesheet Form
        </Typography>
	{student.name}
        <IconButton
          color="inherit"
          aria-label="menu"
          edge="end"
          onClick={handleMenu}
          sx={{ ml: "auto" }}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <ListItemText primary={"Name:"} secondary={student.name} sx={{ width: "120px", px: 2 }} />
          <ListItemText primary={"ID:"} secondary={student.id} sx={{ px: 2 }} />
          <ListItemText primary={"Group:"} secondary={student.group} sx={{ px: 2 }} />
          <ListItemText primary={"Client:"} secondary={student.client} sx={{ px: 2 }} />
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
