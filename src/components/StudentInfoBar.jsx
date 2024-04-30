import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function StudentInfoBar({ studentName, studentId, mentorName }) {
  return (
    <Box
      sx={{
        py: "1%",
        backgroundColor: "#1976d2",
      }}
    >
      <Grid container px="4%">
        <Grid item xs={2}>
          Timesheet Form
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={6}>
          <Stack direction="row" spacing={3} justifyContent="end">
            <div>Name: Bob</div>
            <div>ID: a1234567</div>
            <div>Group: 1 </div>
            <div>Client: Cruz</div>
          </Stack>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
}
