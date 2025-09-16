const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

// initialize server; create Express application
const app = express();

app.use(cors());
app.use(bodyParser.json());

// create connection with env var (variable from Vercel)
const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
});

// GET /api/timers
// send entire array (table) as a response; serves all timer history
app.get("/api/timers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM timer_logs ORDER BY start_time DESC;"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching timer logs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/timers
// retrieve formatted data from frontend, validate, then save (push) as entry in timerLogs
app.post("/api/timers", async (req, res) => {
  const { ramenName, duration } = req.body;

  // validate data
  if (!ramenName || !duration) {
    return res
      .status(400)
      .json({ error: "Ramen name and duration are required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO timer_logs(ramen_name, duration_seconds, start_time) VALUES($1, $2, $3) RETURNING *;",
      [ramenName, duration, new Date().toISOString()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting new timer log:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;