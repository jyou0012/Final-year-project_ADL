"use client";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export default function StateAlert({ children }) {
  const display = children ? "flex" : "none";
  return (
    <Box
      position="fixed"
      zIndex="1200"
      width="100%"
      top="0.85%"
      display={display}
      justifyContent="center"
      alignItems="center"
    >
      <Alert severity="success">{children}</Alert>
    </Box>
  );
}
