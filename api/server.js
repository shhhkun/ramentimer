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
  const { userId } = req.query;

  // validate user
  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const result = await pool.query(
      "SELECT ramen_name, duration_seconds FROM timer_logs WHERE user_id = $1 ORDER BY start_time DESC;",
      [userId]
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
  const { ramenName, duration, userId } = req.body;

  // validate data
  if (!ramenName || !duration || !userId) {
    return res
      .status(400)
      .json({ error: "Ramen name, duration, and userId are required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO timer_logs(ramen_name, duration_seconds, user_id, start_time) VALUES($1, $2, $3, $4::timestamp with time zone) RETURNING *;",
      [ramenName, duration, userId, new Date().toISOString()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting new timer log:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
