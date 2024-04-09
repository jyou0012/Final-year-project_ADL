'use client'

import * as React from 'react';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export function TimesheetTabPanel({value}) {
	return (
		<div>
		{value === 1 && (
<FormControl variant="standard" fullwidth="true">
  <TextField id="Date" label="name" margin="normal" />
  <TextField id="Start" label="id" margin="normal" />
  <TextField id="standard-basic" label="Tasks" multiline margin="normal" minRows="5" size="medium" />
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker label="Date"/>
  </LocalizationProvider>
</FormControl>
		)}
		</div>
	)
}

export default function layout({ children }) {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab value={1} label="Mon" wrapped />
        <Tab value={2} label="Tue" />
        <Tab value={3} label="Wed" />
        <Tab value={4} label="Thu" />
        <Tab value={5} label="Fri" />
      </Tabs>
    </Box>
    <TimesheetTabPanel value={value} />
    </Box>
  )
}
