"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function LoginForm({ action }) {
  const [role, setRole] = useState("student");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Box
      component="form"
      action={action}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        boxShadow: 3,
        borderRadius: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">Role</FormLabel>
        <RadioGroup
          row
          aria-label="role"
          name="role"
          value={role}
          onChange={handleRoleChange}
        >
          <FormControlLabel
            value="student"
            control={<Radio />}
            label="Student"
          />
          <FormControlLabel value="staff" control={<Radio />} label="Staff" />
        </RadioGroup>
      </FormControl>
      <TextField label="Username" name="username" variant="outlined" />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  );
}
