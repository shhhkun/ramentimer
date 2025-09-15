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
      <div
        className="fixed inset-0 flex items-center justify-center z-10 p-6"
        style={{
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-xs text-center">
          <h2 className="text-2xl font-bold">Selected: {selectedRamen.name}</h2>
          <div className="mt-4 rounded-lg bg-gray-100 border border-gray-300">
            <h3
              className="font-bold text-gray-800 tracking-wide"
              style={{ fontSize: "4rem" }}
            >
              {formatTime(timeRemaining)}
            </h3>
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
    )
  );
};

export default Timer;
