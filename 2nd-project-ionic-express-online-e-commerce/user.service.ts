import { Client } from "pg";
import { checkPassword, hashPassword } from "./hash";
import { HTTPError } from "./helperFunction";

export class User {
  constructor(protected username: string, protected password: string) {}
}

export class Customer extends User {
  private phone_number: number | null = null;
  private birth_month: number | null = null;
  private role: string = "customer";
  private deactivated_time: Date | null = null;
  private consumption: number = 0;
  private is_vip: boolean = false;
  private point: number = 0;
  private credit: number = 0;
  private discount: number = 0;
  constructor(username: string, password: string, private email: string) {
    super(username, password);
  }
}

export class UserService {
  constructor(private client: Client) {}

  async signup(user: { username: string; password: string; email: string }) {
    try {
      let hash_password = await hashPassword(user.password);
      let binding = [
        user.username.toLowerCase(),
        hash_password,
        user.email,
        "customer",
        0,
        false,
        0,
        0,
        0,
      ];
      let sql = `insert into "user" (username, password, email, 
        role, consumption ,is_vip, point, credit, discount ) 
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
      let result = await this.client.query(sql, binding);

      return result.rows[0];
    } catch (error) {
      throw new HTTPError(500, String(error));
    }
  }

  async login(user: { username: string; password: string }) {
    try {
      let username = user.username.toLowerCase();
      let result = await this.client.query(
        `select id, username, password, role, deactivated_time from "user" where username=($1)`,
        [username]
      );
      if (result.rows.length === 0) {
        throw new HTTPError(400, "Wrong username or password.");
      }
      let row = result.rows[0];
      let match = await checkPassword(user.password, row.password);
      if (match == false) {
        throw new HTTPError(400, "Wrong password.");
      }

      if (row.deactivated_time !== null) {
        throw new HTTPError(400, "Your permission has been declined.");
      }
      return result.rows[0];
    } catch (error) {
      throw new HTTPError(500, String(error));
    }
  }

  async checkVIP(id: number) {
    try {
      let result = await this.client.query(
        `
      select is_vip, role from "user" where id = $1
      `,
        [id]
      );
      console.log("user:", result.rows[0]);

      return result.rows[0];
    } catch (error) {
      throw new HTTPError(500, String(error));
    }
  }
}
