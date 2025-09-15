"use client";

import "./globals.css";

const Layout = ({ children }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <html lang="en">
      <body>
        <div
          className="flex justify-center items-center min-h-screen w-screen"
          style={{
            backgroundColor: "#ebe2d8",
          }}
        >
          <div
            className="w-full max-w-sm rounded-xl pb-6 pr-6 pl-6"
            style={{
              backgroundColor: "#efd1af",
            }}
          >
            <h1
              className="text-center font-bold py-1"
              style={{
                color: "#451a03",
                fontSize: "1.75rem",
              }}
            >
              Ramen Timer
            </h1>

            {/* 2x3 ramen cards grid */}
            <div
              className="w-full rounded-xl"
              style={{
                backgroundColor: "#efd1af",
                height: "500px",
                backgroundImage:
                  "url('/4.png'), url('/3.png'), url('/2.png'), url('/1.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "auto 100%, auto 100%, auto 100%, auto 100%",
                imageRendering: "pixelated",
              }}
            >
              {children}
            </div>
          </div>

          {/* temp display timer history */}
          {/* <div
            className="mt-6 w-full max-w-sm rounded-xl p-6"
            style={{ backgroundColor: "#d48d3bff" }}
          >
            <h2
              className="text-center text-2xl font-extrabold mb-4"
              style={{ color: "#451a03" }}
            >
              Timer History
            </h2>
            {timerLogs.length > 0 ? (
              <ul className="space-y-2">
                {timerLogs.map((log) => (
                  <li key={log.id} className="p-3 bg-white rounded-lg text-sm">
                    <p>
                      <strong>Ramen:</strong> {log.ramen_name}
                    </p>
                    <p>
                      <strong>Duration:</strong> {log.duration_seconds} seconds
                    </p>
                    <p>
                      <strong>Completed:</strong> {formatDate(log.start_time)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-600">
                No timers have been logged yet.
              </p>
            )}
          </div> */}
        </div>
      </body>
    </html>
  );
};

export default Layout;
