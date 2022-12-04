import jsonfile from "jsonfile";

let iata = "iata.json";
let result = "result.json";
let array = [];

let jsons = jsonfile.readFileSync(result);

for (let json of jsons) {
  for (let obj of json) {
    array.push(obj);
  }
  console.log(array);

  jsonfile.writeFile(iata, array);
}
