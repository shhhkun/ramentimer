const TimerDone = ({
  selectedRamen,
  setShowCompletionMessage,
  handleResetTimer,
}) => {
  return (
    <div className="relative h-full w-full flex items-center justify-center z-10 p-6">
      <h2
        className="absolute text-center -translate-y-36"
        style={{ fontSize: "1.25rem" }}
      >
        Your {selectedRamen.name} ramen is...
      </h2>
      <div
        className="rounded-xl w-full max-w-xs text-center p-6 shadow-md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
      >
        <div
          className="rounded-lg border border-[#C8C6C6]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
        >
          <h3 className="font-bold tracking-wide" style={{ fontSize: "4rem" }}>
            Done!
          </h3>
        </div>
        <div className="flex justify-center mt-4 gap-4">
          <button
            className="px-6 py-2 bg-[#95D374] text-white rounded-lg transition-all duration-200 hover:bg-[#81C05F]"
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
