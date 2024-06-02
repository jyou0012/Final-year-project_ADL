"use client";

import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { formAction, fetchStudents } from "./action";
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
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Email History
      </Typography>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}
      >
        <TextField
          name="SeachContent"
          variant="outlined"
          margin="normal"
          style={{ marginRight: "20px" , width: "600px"}}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Search"}
        </Button>

      </Box>
      {students.length > 0 ? (
        <Paper style={{ padding: "20px" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>Group Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>State</TableCell>
                <TableCell>SendTime</TableCell>
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
                    <TableCell> send</TableCell>
                    <TableCell> 2007-9-9</TableCell>
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
        <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
          No student information available.
        </Typography>
      )}
    </Container>
  );
}

