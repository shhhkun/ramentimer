const TimerDone = ({
  showCompletionMessage,
  setShowCompletionMessage,
  handleResetTimer,
}) => {
  return (
    showCompletionMessage && (
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-xs text-center border-4 border-green-500">
          <h2 className="text-2xl font-bold text-green-700">Ramen is Ready!</h2>
          <p className="mt-2">Enjoy your meal.</p>
          <button
            onClick={() => {
              setShowCompletionMessage(false);
              handleResetTimer();
            }}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg font-bold"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default TimerDone;
