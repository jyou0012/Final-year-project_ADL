"use client";

import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Grid from "@mui/material/Grid";

#create by jojo
function handleClick(event, key) {
  event.preventDefault();
  console.info(`You clicked a breadcrumb with key: ${key}`);
  // 这里你可以根据 key 的不同值执行不同的逻辑
  switch (key) {
    case "1":
      console.info("Do something for JOJO1");
      break;
    case "2":
      console.info("Do something for Draft Content");
      break;
    case "3":
      console.info("Do something for Submit Content");
      break;
  }
}
export default function StaffBar() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Group detail
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="http://localhost:3000/staffs"
    >
      Week detail
    </Link>,
    <Link
      underline="hover"
      key="3"
      color="inherit"
      href="http://localhost:3000/staffs/detail"
    >
      Student detail
    </Link>,
  ];

  return (
    <Grid container mx="3%" my="20px">
      <Stack>
        <Breadcrumbs separator="-" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
    </Grid>
  );
}
