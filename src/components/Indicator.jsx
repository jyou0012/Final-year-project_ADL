import React from "react";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function StatusIndicator({ completed }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {completed ? (
        <CheckCircleIcon color="success" />
      ) : (
        <RadioButtonUncheckedIcon color="disabled" />
      )}
    </Box>
  );
}

export function IndicatorExample() {
  const completed = false; // Set to true or false as needed
  return (
    <Box sx={{ p: 2 }}>
      <StatusIndicator completed={completed} />
    </Box>
  );
}
