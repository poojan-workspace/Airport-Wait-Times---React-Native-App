const puppeteer = require("puppeteer");
const JFK_URL = "https://www.jfkairport.com/";

async function scrapeJFK() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(JFK_URL, { waitUntil: "networkidle2" });
  await page.waitForSelector(".security-table");

  const waitTimes = await page.evaluate(() => {
    const rows = document.querySelectorAll(".security-table tbody tr");
    const results = [];

    rows.forEach((row) => {
      const terminalName = row
        .querySelector(".term-text span")
        ?.innerText.trim();
      const generalLineTime = row
        .querySelectorAll("td")[3]
        ?.querySelector(".right-value div")
        ?.innerText.trim();

      if (terminalName && generalLineTime) {
        results.push({
          checkpoint: terminalName,
          waitTime: `${generalLineTime} min`,
        });
      }
    });

    return results;
  });

  await browser.close();
  return waitTimes;
}

module.exports = scrapeJFK;
