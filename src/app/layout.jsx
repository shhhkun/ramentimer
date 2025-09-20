"use client";

import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Analytics />

        <div
          className="flex justify-center w-screen" //items-center min-h-screen
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
        </div>
      </body>
    </html>
  );
};

export default Layout;
