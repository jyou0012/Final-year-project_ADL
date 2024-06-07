"use client";

import { Fragment, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { formAction, fetchStudents } from "./action";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import SchoolIcon from '@mui/icons-material/School';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  TablePagination,
} from "@mui/material";

export default function Page() {
  const { pending } = useFormStatus();
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    fetchAndDisplayStudents();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const csv = e.target.result;
      const response = await formAction({ csv });
      await fetchAndDisplayStudents();
      alert(response);
    };
    reader.readAsText(file);
  };

  const fetchAndDisplayStudents = async () => {
    const loadedStudents = await fetchStudents();
    setStudents(loadedStudents);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
	<Fragment>
      <Grid container mx="5%" my="1%">
        <Grid item xs={2}>
          <Tabs
          	orientation="vertical"
		value={2}
          >
              <Tab iconPosition="start" icon={<PersonPinIcon />} label="Profile" value={1} sx={{"justify-content": "left"}}
                        onClick={() => {
                            window.location.href = "/staff/profile";
                        }}

              />
              <Tab iconPosition="start" icon={<SchoolIcon />} label="Import Students" value={2} sx={{"justify-content": "left"}}
                        onClick={() => {
                            window.location.href = "/staff/import";
                        }}
              />
              <Tab iconPosition="start" icon={<CalendarMonthIcon />} label="Setup Calendar" value={3} sx={{"justify-content": "left"}}
                        onClick={() => {
                            window.location.href = "/staff/time";
                        }}
              />
                <Tab iconPosition="start" icon={<AccessAlarmIcon />} label="Setup EmailTime" value={4} sx={{"justify-content": "left"}}
                        onClick={() => {
                            window.location.href = "/staff/emailtime";
                        }}
              />
          </Tabs>
        </Grid>
        <Grid item xs={8}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mx: "50px", my: "10px" }}
      >
      <Typography variant="h4" gutterBottom>
        Import Students
      </Typography>
        <TextField
          name="csv"
          type="file"
          onChange={handleFileChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Submit"}
        </Button>
      </Box>
      {students.length > 0 ? (
        <Paper
        sx={{ mx: "50px", my: "10px" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>Group Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Client</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.group}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.client}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Typography variant="subtitle1"
                sx={{ mx: "50px", my: "10px" }}
	>
          No student information available.
        </Typography>
      )}
        </Grid>
      </Grid>
    </Fragment>
  );
}
