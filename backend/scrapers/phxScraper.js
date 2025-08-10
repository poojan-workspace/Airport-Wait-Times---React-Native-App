const puppeteer = require("puppeteer");
const SKYHARBOR_URL = "https://www.skyharbor.com/";

async function scrapePHX() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(SKYHARBOR_URL, { waitUntil: "networkidle2" });
  await page.waitForSelector(".scroll-container");

  const waitTimes = await page.evaluate(() => {
    const items = document.querySelectorAll(
      ".scroll-container .scroll-item.status-box"
    );
    const results = [];

    items.forEach((item) => {
      let checkpoint = item.querySelector("h4")?.innerText.trim();
      if (checkpoint === "Checkpoint") checkpoint = "Checkpoint GENERAL";

      const duration = item.querySelector(".wait-duration")?.innerText.trim();
      const unit = item.querySelector(".wait-unit")?.innerText.trim();

      if (checkpoint && duration && unit) {
        results.push({
          checkpoint,
          waitTime: `${duration} ${unit}`,
        });
      }
    });

    return results;
  });

  await browser.close();
  return waitTimes;
}

module.exports = scrapePHX;
