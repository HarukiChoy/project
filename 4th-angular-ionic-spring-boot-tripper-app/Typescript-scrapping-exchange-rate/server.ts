import express from "express";
import { print } from "listening-on";
import { client } from "./db";

let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get("/rate", async (req, res) => {
//   let query = await client.query("select * from ratedto");
//   let result = query.rows;
//   res.json(result);
//   return;
// });

app.patch("/rate", async (req, res) => {
  let { chi, eng, buy, sell } = req.body;
  console.log(new Date().toLocaleString());
  console.log(req.body);

  if (!chi) {
    res.json({ error: "Missing Chinese name" });
    return;
  }

  if (!eng) {
    res.json({ error: "Missing English name" });
    return;
  }

  if (!buy) {
    res.json({ error: "Missing buying rate" });
    return;
  }

  if (!sell) {
    res.json({ error: "Missing selling rate" });
    return;
  }

  if (
    typeof chi != "string" ||
    typeof eng != "string" ||
    typeof buy != "string" ||
    typeof sell != "string"
  ) {
    res.json({ error: "Invalid data format, please check the json file" });
    return;
  }

  let search = await client.query("select * from ratedto where eng = $1", [
    eng,
  ]);
  let searchResult = search.rows;
  if (searchResult.length === 0) {
    await client.query(
      "insert into ratedto (chi, eng, buy, sell) values ($1, $2, $3, $4)",
      [chi, eng, buy, sell]
    );
    res.end("inserted a new record");
    return;
  }
  await client.query("update ratedto set buy = $1, sell = $2 where eng = $3", [
    buy,
    sell,
    eng,
  ]);
  res.end("Updated the old record");
  return;
});

let port = 8081;
app.listen(port, () => {
  print(port);
});
