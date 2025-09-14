"use client";

import { useState, useEffect } from "react";
import "./globals.css";

// data for ramen:
// - brand name, image src, time in secs
const ramenData = [
  { name: "Shin", imageSrc: "/shin.png", duration: 240 },
  { name: "Jin", imageSrc: "/jin.png", duration: 270 },
  { name: "Samyang", imageSrc: "/samyang.png", duration: 300 },
  { name: "Paldo", imageSrc: "/paldo.png", duration: 210 },
  { name: "Lucky Me", imageSrc: "/luckyme.png", duration: 10 },
  { name: "Indomie", imageSrc: "/indomie.png", duration: 240 },
];

const RamenCard = ({ ramen, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`
        w-full aspect-square rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer
      `}
      style={{ backgroundColor: "#fff" }}
    >
      <img
        className="w-full h-auto transition-transform duration-200 ease-in-out hover:scale-110"
        src={ramen.imageSrc}
        alt={ramen.name}
        style={{ imageRendering: "pixelated" }}
      />
      <h2 className="mt-2 text-center font-semibold text-lg">{ramen.name}</h2>
    </div>
  );
};

const Layout = ({ children }) => {
  const [selectedRamen, setSelectedRamen] = useState(null);
  const [timerStatus, setTimerStatus] = useState("idle"); // idle, running, paused, finished
  const [timeRemaining, setTimeRemaining] = useState(0);

  // helper function to send the log to the backend
  const sendTimerLog = async (logData) => {
    try {
      const response = await fetch("http://localhost:3001/api/timers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        throw new Error("Failed to log timer to the backend.");
      }

      const result = await response.json();
      console.log("Timer logged successfully:", result);
    } catch (error) {
      console.error("Error sending timer log:", error);
    }
  };

  // useEffect to handle the timer countdown logic
  useEffect(() => {
    let intervalId;

    if (timerStatus === "running" && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && timerStatus === "running") {
      setTimerStatus("finished");
      alert("Ramen is ready!");

      // log the timer completion to the backend
      if (selectedRamen) {
        sendTimerLog({
          ramenName: selectedRamen.name,
          duration: selectedRamen.duration,
        });
      }
    }

    // cleanup function to clear the interval when the component unmounts
    // or when the dependencies change to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [timerStatus, timeRemaining]);

  const handleStartTimer = () => {
    if (selectedRamen && timerStatus !== "running") {
      setTimerStatus("running");
      setTimeRemaining(selectedRamen.duration);
    }
  };

  const handlePauseTimer = () => {
    if (timerStatus === "running") {
      setTimerStatus("paused");
    }
  };

  const handleResetTimer = () => {
    setTimerStatus("idle");
    setTimeRemaining(0);
    setSelectedRamen(null);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <html lang="en">
      <body>
        <div
          className="flex justify-center items-center min-h-screen w-screen p-6"
          style={{
            backgroundColor: "#ebe2d8",
          }}
        >
          <div
            className="w-full max-w-sm rounded-xl p-6"
            style={{
              backgroundColor: "#efd1af",
            }}
          >
            <h1
              className="text-center text-3xl font-extrabold mb-6"
              stlye={{
                color: "#451a03",
              }}
            >
              Ramen Timer
            </h1>

            {/* 2x3 ramen cards grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {ramenData.map((ramen, index) => (
                <RamenCard
                  key={index}
                  ramen={ramen}
                  onClick={() => setSelectedRamen(ramen)}
                  isSelected={
                    selectedRamen && selectedRamen.name === ramen.name
                  }
                />
              ))}
            </div>

            {/* temp timer modal */}
            {selectedRamen && (
              <div
                className="fixed inset-0 flex items-center justify-center z-10 p-6"
                style={{
                  backdropFilter: "blur(4px)",
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              >
                <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-xs text-center">
                  <h2 className="text-2xl font-bold">
                    Selected: {selectedRamen.name}
                  </h2>
                  <div className="mt-4 p-4 rounded-lg bg-gray-100 border border-gray-300">
                    <p className="text-5xl font-bold text-gray-800">
                      {formatTime(timeRemaining)}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center space-x-4">
                    {timerStatus === "idle" && (
                      <button
                        onClick={handleStartTimer}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md font-bold transition-all duration-200 hover:bg-green-600"
                      >
                        Start
                      </button>
                    )}
                    {timerStatus === "running" && (
                      <button
                        onClick={handlePauseTimer}
                        className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md font-bold transition-all duration-200 hover:bg-yellow-600"
                      >
                        Pause
                      </button>
                    )}
                    {timerStatus === "paused" && (
                      <button
                        onClick={handleStartTimer}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md font-bold transition-all duration-200 hover:bg-green-600"
                      >
                        Resume
                      </button>
                    )}
                    {(timerStatus === "running" ||
                      timerStatus === "paused" ||
                      timerStatus === "finished") && (
                      <button
                        onClick={handleResetTimer}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md font-bold transition-all duration-200 hover:bg-red-600"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {children}
      </body>
    </html>
  );
};

export default Layout;
