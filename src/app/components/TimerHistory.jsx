const formatDate = (dateString) => {
  // replace the space with 'T' and append 'Z' to create a valid ISO string
  const date = new Date(dateString.replace(" ", "T") + "Z");
  return date.toLocaleString();
};

const TimerHistory = ({ timerLogs }) => {
  return (
    <div className="h-full w-full rounded-xl p-6 overflow-y-auto hide-scrollbar">
      {timerLogs.length > 0 ? (
        <ul className="space-y-4">
          {timerLogs.map((log) => (
            <li
              key={log.id}
              className="p-4 rounded-lg"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.875rem",
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
          className="text-center p-4 rounded-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            fontSize: "0.875rem",
          }}
        >
          No timers have been logged yet.
        </p>
      )}
    </div>
  );
};

export default TimerHistory;
