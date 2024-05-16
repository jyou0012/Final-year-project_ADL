"use client";

import { useState } from 'react';
import { useFormStatus } from "react-dom";
import { formAction } from "./action";
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, TablePagination } from '@mui/material';

export default function Page() {
  const { pending } = useFormStatus();
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20); // Rows per page set to 20

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setFileContent(text);
      setShowTable(true);
      const response = await formAction({ fileContent: text });
      alert(response);
    };
    reader.readAsText(file);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = fileContent.split('\n').slice(1); // Split and skip header

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Student Information Import
      </Typography>
      <Box component="form" action={formAction} style={{ marginBottom: '20px' }}>
        <TextField
          name="csv"
          type="file"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" disabled={pending} fullWidth>
          {pending ? "Submitting..." : "Submit"}
        </Button>
      </Box>
      {showTable && rows.length > 0 ? (
        <>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">File Content:</Typography>
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((line, index) => (
                  <TableRow key={index}>
                    {line.split(',').map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      ) : (
        <Typography variant="subtitle1" style={{ marginTop: '20px' }}>No student information available.</Typography>
      )}
    </Container>
  );
}
