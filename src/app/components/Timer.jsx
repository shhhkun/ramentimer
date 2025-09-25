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
  const getGap = () => {
    // check if more than one button is visible
    if (timerStatus === "running" || timerStatus === "paused") {
      // both pause/resume and reset buttons are visible
      return "justify-between";
    } else {
      // only the start button is visible
      return "justify-center";
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 relative h-full w-full flex justify-center items-center z-10">
      <h2 className="text-xl sm:text-2xl lg:text-3xl absolute text-center top-24">
        Your {selectedRamen.name} ramen is ready in...
      </h2>
      <div
        className="rounded-xl w-full max-w-xs sm:max-w-s lg:max-w-md p-6 sm:p-8 lg:p-10 text-center shadow-md"
        style={{ backgroundColor: "var(--cardbg2)" }}
      >
        <div
          className="rounded-lg border border-[#C8C6C6]"
          style={{ backgroundColor: "var(--cardbg2)" }}
        >
          <h3 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-wide">
            {formatTime(timeRemaining)}
          </h3>
        </div>
        <div
          className={`flex flex-row text-xl sm:text-xl lg:text-3xl mt-4 sm:mt-6 lg:mt-8 ${getGap()}`}
        >
          {timerStatus === "idle" && (
            <button
              onClick={handleStartTimer}
              className="px-6 py-2 lg:px-7 lg:px-5 bg-[#95D374] text-white rounded-lg transition-all duration-200 hover:bg-[#81C05F]"
            >
              start
            </button>
          )}
          {timerStatus === "running" && (
            <button
              onClick={handlePauseTimer}
              className="px-6 py-2 lg:px-7 lg:px-5 bg-[#FFCB3D] text-white rounded-lg transition-all duration-200 hover:bg-[#E5B636]"
            >
              pause
            </button>
          )}
          {timerStatus === "paused" && (
            <button
              onClick={handleStartTimer}
              className="px-6 py-2 lg:px-7 lg:px-5 bg-[#95D374] text-white rounded-lg transition-all duration-200 hover:bg-[#81C05F]"
            >
              resume
            </button>
          )}
          {(timerStatus === "running" ||
            timerStatus === "paused" ||
            timerStatus === "finished") && (
            <button
              onClick={handleResetTimer}
              className="px-6 py-2 lg:px-7 lg:px-5 bg-[#DF4848] text-white rounded-lg transition-all duration-200 hover:bg-[#CC3030]"
            >
              reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
