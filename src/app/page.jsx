"use client";

import { useState, useEffect } from "react";
import RamenCard from "./components/RamenCard";
import Timer from "./components/Timer";
import TimerDone from "./components/TimerDone";
import TimerHistory from "./components/TimerHistory";
import { ListDashesIcon } from "@phosphor-icons/react";
import "./globals.css";

function getPersistentUserId() {
  let userId = localStorage.getItem("ramen_timer_user_id");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("ramen_timer_user_id", userId);
  }
  return userId;
}

// data for ramen: (brand name, image src, time in secs)
const ramenData = [
  { name: "Shin", imageSrc: "/shin.png", duration: 5 },
  { name: "Jin", imageSrc: "/jin.png", duration: 270 },
  { name: "Samyang", imageSrc: "/samyang.png", duration: 300 },
  { name: "Paldo", imageSrc: "/paldo.png", duration: 210 },
  { name: "Lucky Me!", imageSrc: "/luckyme.png", duration: 10 },
  { name: "Indomie", imageSrc: "/indomie.png", duration: 240 },
];

export default function Page() {
  const [selectedRamen, setSelectedRamen] = useState(null);
  const [timerStatus, setTimerStatus] = useState("idle"); // idle, running, paused, finished
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerLogs, setTimerLogs] = useState([]);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [showTimerHistory, setShowTimerHistory] = useState(false);
  const [userId, setUserId] = useState(null);

  // helper function to send the log to the backend
  const sendTimerLog = async (logData) => {
    try {
      const response = await fetch("/api/timers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...logData, userId }),
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

  // helper function to fetch logs from the backend
  const fetchTimers = async (userId) => {
    if (!userId) {
      console.error("User ID not available, cannot fetch logs.");
      return;
    }
    try {
      const response = await fetch("/api/timers?userId=${currentUserId}");
      if (!response.ok) {
        throw new Error("Failed to fetch timer logs.");
      }
      const data = await response.json();
      setTimerLogs(data);
    } catch (error) {
      console.error("Error fetching timer logs:", error);
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
      setShowCompletionMessage(true);

      // log the timer completion to the backend
      if (selectedRamen) {
        sendTimerLog({
          ramenName: selectedRamen.name,
          duration: selectedRamen.duration,
        });
        fetchTimers(userId);
      }
    }

    // cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [timerStatus, timeRemaining, selectedRamen]);

  // hook to run on mount & when user state changes
  useEffect(() => {
    const id = getPersistentUserId();
    setUserId(id);

    if (id) {
      fetchTimers(id);
    }
  }, []);

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

  return (
    <main className="h-full">
      <div className="relative h-full">
        <button
          className="absolute right-0 top-[-40px] transition-transform duration-200 ease-in-out hover:scale-110"
          onClick={() => setShowTimerHistory((prev) => !prev)}
          disabled={selectedRamen || showCompletionMessage}
        >
          <ListDashesIcon size={32} />
        </button>

        {!selectedRamen && !showTimerHistory && (
          <div className="grid grid-cols-2 gap-6 p-4">
            {ramenData.map((ramen, index) => (
              <RamenCard
                key={index}
                selectedRamen={selectedRamen}
                ramen={ramen}
                onClick={() => setSelectedRamen(ramen)}
              />
            ))}
          </div>
        )}

        {selectedRamen && !showCompletionMessage && (
          <Timer
            selectedRamen={selectedRamen}
            timeRemaining={timeRemaining}
            timerStatus={timerStatus}
            handleStartTimer={handleStartTimer}
            handlePauseTimer={handlePauseTimer}
            handleResetTimer={handleResetTimer}
          />
        )}

        {showCompletionMessage && (
          <TimerDone
            selectedRamen={selectedRamen}
            setShowCompletionMessage={setShowCompletionMessage}
            handleResetTimer={handleResetTimer}
          />
        )}

        {showTimerHistory && <TimerHistory timerLogs={timerLogs} />}
      </div>
    </main>
  );
}
