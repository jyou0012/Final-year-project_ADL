import Box from "@mui/material/Box";

export default function RootLayout({ children }) {
  return (
      <Box component="body" sx={{ margin: "0px", padding: "0px" }}>
        {/* Layout UI */}
        {children}
      </Box>
  );
}
