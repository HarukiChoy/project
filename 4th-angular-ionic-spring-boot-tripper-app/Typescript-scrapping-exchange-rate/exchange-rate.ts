import { Page } from "playwright";

export interface Rate {
  chi: string;
  eng: string;
  buy: string;
  sell: string;
}

export class GetExchangeRatePage {
  constructor(private page: Page) {}

  async getPage() {
    let page = this.page;
    await page.goto(
      `https://www.hangseng.com/zh-hk/rates/foreign-currency-tt-exchange-rates/`
    );
    let res = await page.evaluate(async () => {
      let result: Rate[] = [];
      let table = document.querySelector("table");
      let tableRow = table!.querySelectorAll("tr");

      for (let i = 2; i < tableRow.length - 5; i++) {
        let rate: Rate = {
          chi: "",
          eng: "",
          buy: "",
          sell: "",
        };
        let tableRowData = tableRow[i].querySelectorAll("td");
        rate.chi = tableRowData[0].textContent!;
        rate.eng = tableRowData[1].textContent!;
        rate.buy = tableRowData[2].textContent!;
        rate.sell = tableRowData[3].textContent!;
        result.push(rate);
      }
      return result;
    });

    return res;
  }
}
