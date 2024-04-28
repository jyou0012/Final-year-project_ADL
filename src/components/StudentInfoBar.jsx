import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function StudentInfoBar({ studentName, studentId, mentorName }) {
  return (
    <Box sx={{
      p: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1976d2',
    }}>
      <Typography variant="body1" sx={{ color: '#fff', flexGrow: 1 }}>Name: {studentName}</Typography>
      <Typography variant="body1" sx={{ color: '#fff', flexGrow: 1 }}>ID: {studentId}</Typography>
      <Typography variant="body1" sx={{ color: '#fff', flexGrow: 1 }}>Mentor: {mentorName}</Typography>
    </Box>
  );
}

export default StudentInfoBar;
