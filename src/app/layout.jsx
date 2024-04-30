import Box from "@mui/material/Box";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Box component="body" sx={{ margin: "0px", padding: "0px" }}>
        {/* Layout UI */}
        {children}
      </Box>
    </html>
  );
}
