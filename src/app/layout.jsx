import React from "react";
import "./globals.css";

// temp ramen card component
const RamenCard = () => {
  return (
    <div
      className="w-full aspect-square rounded-lg flex items-center justify-center p-6"
      style={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
    >
      <img
        className="w-full"
        src="/shin.png"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div
          className="flex justify-center items-center min-h-screen w-screen p-6"
          style={{ backgroundColor: "#EBE2D8" }}
        >
          <div
            className="w-full max-w-sm rounded-xl p-6 shadow-xl"
            style={{ backgroundColor: "#EFD1AF" }}
          >
            <h1 className="text-center text-2xl font-bold mb-6">Ramen Timer</h1>

            {/* 2x3 ramen cards grid */}
            <div className="grid grid-cols-2 gap-6">
              <RamenCard />
              <RamenCard />
              <RamenCard />
              <RamenCard />
              <RamenCard />
              <RamenCard />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
