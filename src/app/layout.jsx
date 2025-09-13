export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div
          className="min-h-screen relative"
          style={{
            backgroundColor: "var(--bg)",
            overflow: "hidden",
          }}
        >
          
        </div>
        {children}
      </body>
    </html>
  );
}
