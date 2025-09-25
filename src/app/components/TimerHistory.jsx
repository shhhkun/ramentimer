const formatDate = (dateString) => {
  if (!dateString) {
    return "N/A";
  }
  const date = new Date(dateString);
  return date.toLocaleString();
};

const TimerHistory = ({ timerLogs }) => {
  return (
    <div className="h-full w-full rounded-xl p-6 sm:p-8 lg:p-10 overflow-y-auto hide-scrollbar">
      {timerLogs.length > 0 ? (
        <ul className="space-y-4">
          {timerLogs.map((log) => (
            <li
              key={log.id}
              className="text-sm sm:text-base lg:text-xl p-4 sm:p-6 lg:p-8 text-center rounded-lg"
              style={{
                backgroundColor: "var(--cardbg2)",
              }}
            >
              <p>
                <strong>Ramen:</strong> {log.ramen_name}
                <br />
                <strong>Duration:</strong> {log.duration_seconds} seconds
                <br />
                <strong>Completed:</strong> {formatDate(log.start_time)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p
          className="text-sm sm:text-base lg:text-xl p-4 sm:p-6 lg:p-8 text-center rounded-lg"
          style={{
            backgroundColor: "var(--cardbg2)",
          }}
        >
          No timers have been logged yet.
        </p>
      )}
    </div>
  );
};

export default TimerHistory;
