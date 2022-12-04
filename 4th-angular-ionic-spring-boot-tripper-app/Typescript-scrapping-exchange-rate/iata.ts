import { collectTableWithHeaders } from "playwright-table";
import { firefox } from "playwright";
import jsonfile from "jsonfile";

let json = "result.json";
let array: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

async function main(char: string) {
  let browser = await firefox.launch();
  let page = await browser.newPage();

  await page.goto(
    "https://en.wikipedia.org/wiki/List_of_airports_by_IATA_airport_code:_" +
      char
  );
  await page.waitForSelector(".wikitable");
  let rows = await collectTableWithHeaders({
    page,
    selector: ".wikitable",
  });
  await page.close();
  await browser.close();
  return rows;
}

async function main2() {
  let resultArray = [];
  for (let char of array) {
    console.log(char);
    let result = await main(char);
    resultArray.push(result);
  }
  jsonfile.writeFile(json, resultArray);
  return resultArray;
}

main2();
