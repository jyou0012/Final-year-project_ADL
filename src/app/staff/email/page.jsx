"use client";

import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { formAction, fetchNotifications } from "./action";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    fetchAndDisplayNotifications();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchAndDisplayNotifications(searchQuery);
  };

  const fetchAndDisplayNotifications = async (query = "") => {
    const loadedNotifications = await fetchNotifications(query);
    setNotifications(loadedNotifications);
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
          name="searchContent"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          margin="normal"
          style={{ marginRight: "20px", width: "600px" }}
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

      {notifications.length > 0 ? (
        <Paper style={{ padding: "20px" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((notification, index) => (
                  <TableRow key={index}>
                    <TableCell>{notification.id}</TableCell>
                    <TableCell>{notification.name}</TableCell>
                    <TableCell>{notification.group}</TableCell>
                    <TableCell>{notification.email}</TableCell>
                    <TableCell>{notification.message}</TableCell>
                    <TableCell>{new Date(notification.time).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={notifications.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
          No notifications available.
        </Typography>
      )}
    </Container>
  );
}
