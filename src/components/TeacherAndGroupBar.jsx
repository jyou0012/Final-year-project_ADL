"use client";
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function TeacherAndGroupBar() {
  const [group, setGroup] = useState('');
  const groups = ["Group A", "Group B", "Group C"]; 

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
          Staff: Dr.Cruz
        </Typography>
        <Select
          value={group}
          onChange={handleGroupChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ backgroundColor: 'white', color: 'black', width: 120, mr: 2 }}
        >
          <MenuItem value="" disabled>
            Select Group
          </MenuItem>
          {groups.map((g, index) => (
            <MenuItem key={index} value={g}>{g}</MenuItem>
          ))}
        </Select>
      </Toolbar>
    </AppBar>
  );
}

