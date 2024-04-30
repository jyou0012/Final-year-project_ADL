export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: "0px", padding: "0px" }}>
        {/* Layout UI */}
        {children}
      </body>
    </html>
  );
}
