const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const Timer = ({
  selectedRamen,
  timerStatus,
  timeRemaining,
  handleStartTimer,
  handlePauseTimer,
  handleResetTimer,
}) => {
  return (
    selectedRamen && (
      <div className="h-full w-full flex items-center justify-center z-10">
        <div className="relative flex-grow flex justify-center items-center p-6">
          <h2 className="absolute text-center -translate-y-36" style={{ fontSize: "1.25rem" }}>
            Your {selectedRamen.name} ramen is ready in...
          </h2>
          <div
            className="rounded-xl w-full max-w-xs text-center p-6 shadow-md"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
          >
            <div
              className="rounded-lg border border-[#C8C6C6]"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
            >
              <h3
                className="font-bold tracking-wide"
                style={{ fontSize: "4rem" }}
              >
                {formatTime(timeRemaining)}
              </h3>
            </div>
            <div className="flex justify-center mt-4 gap-4">
              {timerStatus === "idle" && (
                <button
                  onClick={handleStartTimer}
                  className="px-6 py-2 bg-[#95D374] text-white rounded-lg transition-all duration-200 hover:bg-[#81C05F]"
                >
                  start
                </button>
              )}
              {timerStatus === "running" && (
                <button
                  onClick={handlePauseTimer}
                  className="px-6 py-2 bg-[#FFCB3D] text-white rounded-lg transition-all duration-200 hover:bg-[#E5B636]"
                >
                  pause
                </button>
              )}
              {timerStatus === "paused" && (
                <button
                  onClick={handleStartTimer}
                  className="px-6 py-2 bg-[#95D374] text-white rounded-lg transition-all duration-200 hover:bg-[#81C05F]"
                >
                  resume
                </button>
              )}
              {(timerStatus === "running" ||
                timerStatus === "paused" ||
                timerStatus === "finished") && (
                <button
                  onClick={handleResetTimer}
                  className="px-6 py-2 bg-[#DF4848] text-white rounded-lg transition-all duration-200 hover:bg-[#CC3030]"
                >
                  reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Timer;
