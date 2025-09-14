const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // middleware

// simple array to act as PostgreSQL database table
let timerLogs = [];

// initialize server; create Express application
const app = express();
const PORT = 3001;

// use the cors middleware to allow cross-origin requests
app.use(cors());

// use body-parser to handle JSON data from frontend
app.use(bodyParser.json());

// GET /api/timers
// send entire array (table) as a response; serves all timer history
app.get("/api/timers", (req, res) => {
  res.status(200).json(timerLogs);
});

// POST /api/timers
// retrieve formatted data from frontend, validate, then save (push) as entry in timerLogs
app.post("/api/timers", (req, res) => {
  const { ramenName, duration } = req.body; // from frontend request body

  // validate data
  if (!ramenName || !duration) {
    return res
      .status(400)
      .json({ error: "Ramen name and duration are required." });
  }

  // create a new log entry
  const newLog = {
    id: Date.now(), // normally auto-generated in real database
    ramenName: ramenName,
    duration: duration,
    startTime: new Date().toISOString(),
  };

  timerLogs.push(newLog);

  res.status(201).json(newLog);
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
