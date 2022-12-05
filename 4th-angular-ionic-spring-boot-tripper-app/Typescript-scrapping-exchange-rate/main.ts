import { chromium } from "playwright";
import { GetExchangeRatePage, Rate } from "./exchange-rate";
import fetch from "node-fetch";
import schedule from "node-schedule";

export class Scrapper {
  async main() {
    let browser = await chromium.launch({ headless: false });
    let page = await browser.newPage();
    let crawler = new GetExchangeRatePage(page);
    let result = await crawler.getPage();
    await page.close();
    await browser.close();
    this.updateRate(result);
    return;
  }

  async updateRate(result: Array<Rate>) {
    for (let record of result) {
      let { chi, eng, buy, sell } = record;
      if (!chi || !eng || !buy || !sell) {
        return;
      }

      if (
        typeof chi != "string" ||
        typeof eng != "string" ||
        typeof buy != "string" ||
        typeof sell != "string"
      ) {
        return;
      }
      await fetch("http://localhost:8080/rate/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    }
    return;
  }

  jobSchedule() {
    let rule = new schedule.RecurrenceRule();
    // rule.minute = [0, 15, 30, 45];
    rule.second = 0;
    schedule.scheduleJob(rule, () => this.main());
  }
}
let scrapper = new Scrapper();
scrapper.jobSchedule();

// Functional version
// export async function main() {
//   let browser = await chromium.launch({ headless: false });
//   let page = await browser.newPage();
//   let crawler = new GetExchangeRatePage(page);
//   let result = await crawler.getPage();
//   await page.close();
//   await browser.close();

//   async function updateRate() {
//     for (let record of result) {
//       await fetch("http://localhost:8081/rate", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(record),
//       });
//     }
//   }
//   updateRate();
// }
// main().catch((e) => console.error(e));

// function jobSchedule() {
//   let rule = new schedule.RecurrenceRule();
//   rule.minute = [0, 15, 30, 45];
//   rule.second = 0;
//   schedule.scheduleJob(rule, () => main());
// }
// main().catch((e) => console.error(e));

// jobSchedule();
