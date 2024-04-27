import React from 'react';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'; 

function StatusIndicator({ completed }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {completed ? (
        <CheckCircleIcon color="success" fontSize="large" />
      ) : (
        <RadioButtonUncheckedIcon color="disabled" fontSize="large" />
      )}
    </Box>
  );
}

export default function condition_view() {
  const students = [
    { draft: false, submission: true },
    { draft: true, submission: false },
    { draft: true, submission: true },
    { draft: false, submission: false },
    { draft: true, submission: true }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <div style={{ marginLeft: '180px' }}>Draft</div> {/* Adjusted spacing */}
        <div style={{ marginLeft: '80px' }}>Submission</div> {/* Adjusted spacing */}
      </Box>
      {students.map((student, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 14, my: 6 }}>
          <div>Student {index + 1}:</div>
          <StatusIndicator completed={student.draft} />
          <StatusIndicator completed={student.submission} />
        </Box>
      ))}
    </Box>
  );
}
