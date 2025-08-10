const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const pool = require("./services/db"); // Import DB connection
const cron = require("node-cron");

//const scrapePHX = require("./scrapers/phxScraper");
//const scrapeJFK = require("./scrapers/jfkScraper");
const scrapeAllAirports = require("./scrapers/scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// 🔁 Shared scraping & database updater
const scrapeAndUpdateWaitTimes = async (airport) => {
  let waitTimes = [];
  if (airport === "PHX") waitTimes = await scrapePHX();
  else if (airport === "JFK") waitTimes = await scrapeJFK();
  else throw new Error("Unsupported airport code");

  for (const item of waitTimes) {
    await pool.query(
      `INSERT INTO wait_times (airport_code, checkpoint, wait_time, last_updated)
       VALUES ($1, $2, $3, now())
       ON CONFLICT (airport_code, checkpoint)
       DO UPDATE SET wait_time = EXCLUDED.wait_time, last_updated = now();`,
      [airport, item.checkpoint, item.waitTime]
    );
  }
};

// 📌 Manual scraper trigger for any airport
app.get("/api/update-all-airports", async (req, res) => {
  try {
    await scrapeAllAirports();
    res.json({ message: "✅ All airport data updated in DB" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update airport wait times" });
  }
});

// 📌 API to fetch wait times by airport
app.get("/api/wait-times", async (req, res) => {
  const { airport } = req.query;
  if (!airport) {
    return res.status(400).json({ error: "Missing airport parameter" });
  }

  try {
    const { rows } = await pool.query(
      `SELECT DAY, HOUR, AVG_WAIT, LAST_UPDATED
         FROM TSA_WAIT_TIME
         WHERE IATA_CODE = $1
         ORDER BY 
           CASE 
             WHEN DAY = 'Mon' THEN 1
             WHEN DAY = 'Tue' THEN 2
             WHEN DAY = 'Wed' THEN 3
             WHEN DAY = 'Thu' THEN 4
             WHEN DAY = 'Fri' THEN 5
             WHEN DAY = 'Sat' THEN 6
             WHEN DAY = 'Sun' THEN 7
           END,
           HOUR`,
      [airport.toUpperCase()]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching wait times:", error);
    res.status(500).json({ error: "Failed to fetch wait times" });
  }
});

// 📌 Home page
app.get("/", (req, res) => {
  res.send("🚀 Airport Wait Times Scraper API is running!");
});

// 🕐 Cron jobs (every 5 minutes)
// 🕐 Cron jobs (every X minutes)
cron.schedule("*/60 * * * *", async () => {
  console.log("🕐 Cron: Updating all airports...");
  await scrapeAllAirports();
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
