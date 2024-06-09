"use client";

import {Fragment, useState} from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import SchoolIcon from '@mui/icons-material/School';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function SettingTabs() {
  const [selectedSetting, setSetting] = useState(1);

  const tabChange = (event, newSetting) => {
    setSetting(newSetting);
  };

  return (
    <Fragment>
          <Tabs
	        onChange={tabChange}
		value={selectedSetting}
          >
              <Tab iconPosition="start" icon={<PersonPinIcon />} label="Profile" value={1} sx={{justifyContent: "left"}} />
              <Tab iconPosition="start" icon={<SchoolIcon />} label="Import Students" value={2} sx={{justifyContent: "left"}} />
              <Tab iconPosition="start" icon={<CalendarMonthIcon />} label="Setup Calendar" value={3} sx={{justifyContent: "left"}} />
          </Tabs>
          { selectedSetting === 1 && (
          	<Fragment> </Fragment>
          )}
          { selectedSetting === 2 && (
          	<Fragment> </Fragment>
          	
          )}
    </Fragment>
  );

}
