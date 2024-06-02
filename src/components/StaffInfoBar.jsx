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

export default function StaffInfoBar() {
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

  const handleSetupMenu = (event) => {
    setSetupAnchorEl(event.currentTarget);
  };

  const handleSetupClose = () => {
    setSetupAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Timesheet Dashboard
        </Typography>
        Dr. Cruz
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
          >
            Overview
          </MenuItem>
          <MenuItem
            onClick={handleSetupMenu}
          >
            Set up <ArrowRightIcon />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <Menu
          id="setup-menu"
          anchorEl={setupAnchorEl}
          open={setupOpen}
          onClose={handleSetupClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
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
              window.location.href = "/staff/email";
              handleClose();
            }}
          >
            Email History
          </MenuItem>


          <Divider />

          <MenuItem
            onClick={() => {
              window.location.href = "/staff/time";
              handleSetupClose();
              handleClose();
            }}
          >
            Time
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
