const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // middleware

require("dotenv").config();
const { Client } = require("pg");

// initialize server; create Express application
const app = express();
const PORT = 3001;

app.use(cors()); // use the cors middleware to allow cross-origin requests
app.use(bodyParser.json()); // use body-parser to handle JSON data from frontend

// create a new PostgreSQL client using the connection string from the .env file
const client = new Client({
  connectionString: process.env.NEON_DB_URL,
});

// GET /api/timers
// send entire array (table) as a response; serves all timer history
app.get("/api/timers", async (req, res) => {
  try {
    const result = await client.query(
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
  const { ramenName, duration } = req.body; // from frontend request body

  // validate data
  if (!ramenName || !duration) {
    return res
      .status(400)
      .json({ error: "Ramen name and duration are required." });
  }

  try {
    const result = await client.query(
      "INSERT INTO timer_logs(ramen_name, duration_seconds, start_time) VALUES($1, $2, $3) RETURNING *;",
      [ramenName, duration, new Date().toISOString()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting new timer log:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function connectToDbAndStartServer() {
  try {
    // connect to the PostgreSQL database
    await client.connect();
    console.log("Connected to PostgreSQL database!");

    // create the timer_logs table if it doesn't already exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS timer_logs (
        id SERIAL PRIMARY KEY,
        ramen_name VARCHAR(255) NOT NULL,
        duration_seconds INT NOT NULL,
        start_time TIMESTAMP NOT NULL
      );
    `;
    await client.query(createTableQuery);
    console.log("Timer logs table is ready.");

    // start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(
      "Failed to connect to the database or start the server:",
      err
    );
    process.exit(1);
  }
}

connectToDbAndStartServer();
