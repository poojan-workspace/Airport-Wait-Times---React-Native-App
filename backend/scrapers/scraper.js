const { chromium } = require("playwright");
const fs = require("fs");
const pLimit = require("p-limit").default;

const pool = require("../services/db");

const CONCURRENCY_LIMIT = 10;

async function scrapeAirport(iataCode) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = `https://plaintextwaittimes.com/airport/${iataCode}`;

  try {
    await page.goto(url, { timeout: 60000 });

    const bodyText = await page.textContent("body");

    // Extract simple stats
    const currentWait = await page.evaluate(() => {
      const scriptTag = Array.from(document.querySelectorAll("script")).find(
        (s) => s.textContent.includes("const structuredData =")
      );
      if (!scriptTag) return null;

      const match = scriptTag.textContent.match(
        /const structuredData\s*=\s*(\{[\s\S]*?\});/
      );
      if (!match || match.length < 2) return null;

      const structuredData = eval("(" + match[1] + ")");

      const now = new Date();
      const localDay = now.toLocaleString("en-US", { weekday: "short" });
      const hour24 = now.getHours();
      const hour12 = hour24 % 12 || 12;
      const period = hour24 >= 12 ? "PM" : "AM";

      const data = structuredData[period].find(
        (item) =>
          parseInt(item.hour) === hour12 && item.day.slice(0, 3) === localDay
      );

      return data ? `${data.maxWait} Min` : null;
    });

    // Extract from structuredData inside the page
    // Extract structuredData from script tag and parse it
    // Extract structuredData directly from the <script> tag
    const hourlyWaits = await page.evaluate(() => {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const result = {
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: [],
      };

      try {
        // Find the script tag containing "structuredData"
        const scriptTag = Array.from(document.querySelectorAll("script")).find(
          (s) => s.textContent.includes("const structuredData =")
        );

        if (!scriptTag) {
          console.error("❌ structuredData script tag not found");
          return result;
        }

        // Extract the JS object using regex
        const match = scriptTag.textContent.match(
          /const structuredData\s*=\s*(\{[\s\S]*?\});/
        );
        if (!match || match.length < 2) {
          console.error("❌ structuredData object not found in script content");
          return result;
        }

        const structuredData = eval("(" + match[1] + ")");

        // Process both AM and PM data
        ["AM", "PM"].forEach((period) => {
          structuredData[period].forEach(({ hour, maxWait, day }) => {
            const shortDay = day.slice(0, 3);
            if (result[shortDay]) {
              let [hourNum, meridian] = hour.split(" ");
              hourNum = parseInt(hourNum, 10);
              let endHour = hourNum === 12 ? 1 : hourNum + 1;
              let hourFormatted = `${hourNum} ${meridian} - ${endHour} ${meridian}`;
              result[shortDay].push({
                hour: hourFormatted,
                avgWait: `${maxWait} Min`,
              });
            }
          });
        });

        return result;
      } catch (err) {
        console.error("❌ Error parsing structuredData:", err);
        return result;
      }
    });

    const result = {
      currentWait,
      hourlyWaits,
    };

    console.log(`✅ Scraped: ${iataCode}`);
    return { code: iataCode, data: result };
  } catch (err) {
    console.error(`❌ Error scraping ${iataCode}:`, err.message);
    return { code: iataCode, data: null };
  } finally {
    await browser.close();
  }
}

async function scrapeAllAirports() {
  const path = require("path");
  const airportCodes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../airport_codes.json"), "utf-8")
  );

  const limit = pLimit(CONCURRENCY_LIMIT);

  const tasks = airportCodes.airports.map((code, index) =>
    limit(async () => {
      console.log(
        `(${index + 1}/${airportCodes.airports.length}) Scraping: ${code}`
      );
      const { data } = await scrapeAirport(code);
      if (!data) return;

      const { hourlyWaits } = data;

      const insertPromises = [];

      for (const day in hourlyWaits) {
        hourlyWaits[day].forEach(({ hour, avgWait }) => {
          insertPromises.push(
            pool.query(
              `INSERT INTO TSA_WAIT_TIME (IATA_CODE, DAY, HOUR, AVG_WAIT, LAST_UPDATED, INS_TIMESTAMP)
               VALUES ($1, $2, $3, $4, now(), now())
               ON CONFLICT (IATA_CODE, DAY, HOUR)
               DO UPDATE SET AVG_WAIT = EXCLUDED.AVG_WAIT, LAST_UPDATED = now();`,
              [code, day, hour, avgWait]
            )
          );
        });
      }

      await Promise.all(insertPromises);
      console.log(`✅ Data saved to DB for ${code}`);
    })
  );

  await Promise.all(tasks);
  console.log("✅ All airport wait times updated in Supabase DB");
}

scrapeAllAirports();
