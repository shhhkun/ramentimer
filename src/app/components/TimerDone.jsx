const TimerDone = ({
  selectedRamen,
  setShowCompletionMessage,
  handleResetTimer,
}) => {
  return (
    <div className="p-6 sm:p-8 lg:p-10 relative h-full w-full flex items-center justify-center z-10">
      <h2 className="absolute text-xl sm:text-2xl lg:text-3xl text-center top-24">
        Your {selectedRamen.name} ramen is...
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
            Done!
          </h3>
        </div>
        <div className="flex justify-center sm:text-xl lg:text-3xl mt-4 sm:mt-6 lg:mt-8">
          <button
            className="px-6 py-2 lg:px-7 lg:px-5 bg-[#95D374] text-white rounded-lg transition-all duration-200 hover:bg-[#81C05F]"
            onClick={() => {
              setShowCompletionMessage(false);
              handleResetTimer();
            }}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerDone;
