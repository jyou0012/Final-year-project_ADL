"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function StaffInfoBar({ staff }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [setupAnchorEl, setSetupAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const setupOpen = Boolean(setupAnchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
    handleClose();
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Timesheet Dashboard
        </Typography>
        {staff.name}
        <IconButton
          color="inherit"
          aria-label="menu"
          edge="end"
          onClick={handleMenu}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              window.location.href = "/staff/overview";
              handleClose();
            }}
	  sx={{ width: "140px" }}
          >
            Overview
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.location.href = "/staff/email";
              handleClose();
            }}
          >
            Reminder
          </MenuItem>

          <MenuItem onClick={handleLogout}>Logout</MenuItem>

	  <Divider textAlign="left">settings</Divider>
          <MenuItem
            onClick={() => {
              window.location.href = "/staff/import";
              handleSetupClose();
              handleClose();
            }}
          >
            Import
          </MenuItem>

          <MenuItem
            onClick={() => {
              window.location.href = "/staff/time";
              handleSetupClose();
              handleClose();
            }}
          >
            Time
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
