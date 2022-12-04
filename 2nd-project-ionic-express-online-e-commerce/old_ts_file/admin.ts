import { client } from "../db";
import { Router } from "express";
import { hashPassword } from "../hash";
import { User } from "../user.service";

export let adminRoute = Router();

adminRoute.get("/", async (req, res) => {
  try {
    let result = await client.query(
      `select id, username, deactivated_time from "user"
       where role='staff' order by id`
    );
    let rows = result.rows;
    res.json(rows);
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});

export class Staff extends User {
  private role: string = "staff";
  private discount: number = 20;
  constructor(username: string, password: string) {
    super(username, password);
  }
  async createAccount() {
    let hash_password = await hashPassword(this.password);
    let binding = [
      this.username.toLowerCase(),
      hash_password,
      this.role,
      this.discount,
    ];
    let sql = `insert into "user" (username, password, role, discount ) 
    values ($1, $2, $3, $4 ) returning *`;
    await client.query(sql, binding);
    return;
  }
}

// Add Staff
adminRoute.post("/addStaff", async (req, res) => {
  try {
    let { username, password, re_password } = req.body;
    if (!username) {
      res.status(400);
      res.json({ error: "Missing username" });
      return;
    }

    if (!password) {
      res.status(400);
      res.json({ error: "Missing password" });
      return;
    }
    if (password !== re_password) {
      res.status(400);
      res.json({ error: "Two passwords are not matched." });
      return;
    }
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof re_password !== "string"
    ) {
      res.status(400);
      res.json({ error: "Invalid username or password, please try again." });
      return;
    }

    let staff = new Staff(username, password);
    await staff.createAccount();
    res.status(200);
    res.json({});
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});

adminRoute.patch("/:id", async (req, res) => {
  try {
    let id = +req.params.id;
    if (typeof id !== "number") {
      throw new Error("");
      return;
    }
    let { status } = req.query;
    if (status == "deactivate") {
      await client.query(
        `update "user" set deactivated_time = CURRENT_TIMESTAMP where id = $1`,
        [id]
      );
    }
    if (status == "activate") {
      await client.query(
        `update "user" set deactivated_time = null where id = $1`,
        [id]
      );
    }
    res.json({});
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});
