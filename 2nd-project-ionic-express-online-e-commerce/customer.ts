import { client } from "./db";
import { hashPassword, checkPassword } from "./hash";
import { Router } from "express";
import "./session";

export let customerRoute = Router();

customerRoute.get("/info", async (req, res) => {
  let id = req.session.user!.id;
  try {
    let result = await client.query(`SELECT * FROM "user" where id = $1;`, [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});

customerRoute.patch("/info", async (req, res) => {
  try {
    let id = +req.session.user!.id;
    let { phone_number, birth_month } = req.body;
    await client.query(
      `update "user" set phone_number=${phone_number},birth_month=${birth_month} where id=${id}`
    );
    res.status(202);
    res.json({});
  } catch (error) {
    res.status(500);
    res.json({ error: "String(error" });
  }
});

customerRoute.get("/orderChecking", async (req, res) => {
  try {
    let result = await client.query(
      `select * from "order" where user_id = $1`,
      [req.session.user!.id]
    );
    let row = result.rows;
    console.log(row);
    res.json(row);
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});

customerRoute.get("/id", async (req, res) => {
  try {
    let result = await client.query(
      `select id from "user" where role = 'customer' and id = $1`,
      [req.session.user!.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});

customerRoute.patch("/:id", async (req, res) => {
  let id = +req.params.id;
  let { old_password, new_password, re_password } = req.body;
  if (!old_password) {
    res.status(400);
    res.json({ error: "Missing old password." });
    return;
  }

  if (!new_password || !re_password) {
    res.status(400);
    res.json({ error: "Missing new password." });
    return;
  }

  if (new_password !== re_password) {
    res.status(400);
    res.json({ error: "Two passwords are not matched." });
    return;
  }

  let result = await client.query(`select * from "user" where id = $1`, [id]);
  let target = result.rows[0];
  let match = await checkPassword(old_password, target.password);
  if (match == false) {
    res.status(400);
    res.json({ error: "Wrong password." });
    return;
  }
  let hash_new_password = await hashPassword(new_password);
  await client.query(`update "user" set password = $1 where id = $2`, [
    hash_new_password,
    id,
  ]);
  res.json({});
});

customerRoute.post("/coupon", async (req, res) => {
  let { code } = req.body;
  console.log("code:", code);
  try {
    let couponResult = await client.query(
      `select * from coupon where code = $1`,
      [code]
    );
    let coupon = couponResult.rows;
    console.log(coupon);
    if (coupon.length == 0) {
      res.status(400);
      res.json({ error: "優惠碼無效" });
      return;
    }

    let amount = 0;
    for (let id in req.session.item) {
      let itemQty = req.session.item[id];
      let result = await client.query(`select price from item where id = $1`, [
        id,
      ]);
      let itemPrice = result.rows[0].price;
      amount += itemQty * itemPrice;
    }
    if (req.session.user!.role == "staff") {
      amount = amount * 0.8;
    } else {
      let isVIP = await client.query(
        `select is_vip from "user" where id = $1`,
        [req.session.user!.id]
      );
      let is_vip = isVIP.rows[0].is_vip;
      if (is_vip == true) {
        amount = amount * 0.9;
      }
    }
    if (amount < coupon[0].condition) {
      res.status(400);
      res.json({ error: "購物金額不足" });
      return;
    }

    if (coupon[0].no_of_coupon <= 0) {
      res.status(400);
      res.json({ error: "優惠已全部被兌換" });
      return;
    }
    let today = new Date();
    if (today < coupon[0].start_date) {
      res.status(400);
      res.json({ error: "優惠仍未開始" });
      return;
    }
    if (today > coupon[0].end_date) {
      res.status(400);
      res.json({ error: "優惠已結束" });
      return;
    }
    if (req.session.user!.promoCode == code) {
      res.status(400);
      res.json({ error: "You are using the coupon in this transaction" });
      return;
    }
    req.session.user!.promoCode = code;
    req.session.save();
    amount = amount - coupon[0].amount;
    res.json({ couponAmount: coupon[0].amount, amount });
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});
