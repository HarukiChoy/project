import { client } from "./db";
import { Router } from "express";
import "./session";

export let cartRoute = Router();

// Get name of items in session.item
cartRoute.get("/name/:id", async (req, res) => {
  try {
    let id = +req.params.id;
    console.log("id:", id);
    let result = await client.query(
      "select name, price from item where id = $1",
      [id]
    );
    console.log("result.row[0]:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});

// Get items in session.item
cartRoute.get("/item", async (req, res) => {
  try {
    console.log("req.session.item:", req.session.item);
    res.json(req.session.item);
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});

cartRoute.get("/weight", async (req, res) => {
  try {
    let weight = 0;
    for (let id in req.session.item) {
      let itemQty = req.session.item[id];
      let result = await client.query(`select weight from item where id = $1`, [
        id,
      ]);
      let itemWeight = result.rows[0].weight;
      weight += itemQty * itemWeight;
    }
    console.log("weight:", weight);
    res.json({ weight });
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});

cartRoute.get("/amount", async (req, res) => {
  try {
    let amount = 0;
    for (let id in req.session.item) {
      let itemQty = req.session.item[id];
      let result = await client.query(`select price from item where id = $1`, [
        id,
      ]);
      let itemPrice = result.rows[0].price;
      amount += itemQty * itemPrice;
    }
    req.session.user!.amount = amount;
    if (req.session.user!.role == "staff") {
      req.session.user!.amount = req.session.user!.amount * 0.8;
      res.json(req.session.user!.amount);
      return;
    } else {
      let result = await client.query(
        `select role,is_vip from "user" where id = $1`,
        [req.session.user!.id]
      );
      let is_vip = result.rows[0].is_vip;
      if (is_vip == true) {
        req.session.user!.amount = req.session.user!.amount * 0.9;
      }
    }

    console.log("final amount:", req.session.user!.amount);
    res.json(req.session.user!.amount);
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});

// Add items to session.inactive_item
// cartRoute.post("/inactive_cart", async (req, res) => {
//   try {
//     let { id, name, price } = req.body;
//     req.session.inactive_item?.push(req.body);
//     // Remove this item from session.item
//     delete req.session.item![id];
//     res.end();
//   } catch (error) {
//     res.json({ error: String(error) });
//   }
// });

// Get items from session.inactive_item
// cartRoute.get("/inactive_cart", async (req, res) => {
//   try {
//     res.json(req.session.inactive_item);
//   } catch (error) {
//     res.json({ error: String(error) });
//   }
// });

// Adding item to session.item
cartRoute.post("/:id", async (req, res) => {
  let id = +req.params.id;
  try {
    let count = +req.query.count! || 1;
    if (!req.session.item) {
      req.session.item = {};
    }
    // req.session.item = {[id]: }
    req.session.item[id] = count;
    res.json(req.session.item[id]);
  } catch (error) {
    res.json({ error: String(error) });
  }
});

// Remove item in session.inactive_item
// cartRoute.patch("/inactive_cart", async (req, res) => {
//   try {
//     let { index, operation } = req.body;
//     switch (operation) {
//       case "remove":
//         req.session.inactive_item?.splice(index, 1);
//         break;
//     }
//     res.end();
//   } catch (error) {
//     res.json({ error: String(error) });
//   }
// });

// Changing item quantity in cart
cartRoute.patch("/cart", async (req, res) => {
  try {
    let { id, operation } = req.body;
    console.log({ id, operation });

    if (!req.session.item) {
      req.session.item = {};
    }
    let count = +req.session.item[id] || 0;
    switch (operation) {
      case "add":
        // req.session.item![id] += 1;
        count++;
        break;
      case "reduce":
        // req.session.item![id] -= 1;
        count--;
        break;
    }
    if (count < 0) {
      count = 0;
    }
    req.session.item[id] = count;
    console.log(count);
    res.json({ count: count });
  } catch (error) {
    res.status(400);
    res.json({ error: String(error) });
  }
});

// Store sum from cart
cartRoute.post("/cart/sum", async (req, res) => {
  try {
    let { sum } = req.body;
    req.session.cart_sum = sum;
    res.end();
  } catch (error) {
    res.json({ error: String(error) });
  }
});

cartRoute.get("/credit", async (req, res) => {
  try {
    let id = req.session.user!.id;
    let result = await client.query(`select credit from "user" where id = $1`, [
      id,
    ]);
    let credit = result.rows[0];
    console.log("credit:", credit);
    res.status(200);
    res.json(credit);
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});
