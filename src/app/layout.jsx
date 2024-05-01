"use client";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Box component="body" sx={{ margin: "0px", padding: "0px" }}>
        {/* Layout UI */}
        <ThemeProvider theme={theme}>{children}</ThemeProvider>;
      </Box>
    </html>
  );
}
