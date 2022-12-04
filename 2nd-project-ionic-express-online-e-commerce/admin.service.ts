import { Client } from "pg";
import { hashPassword } from "./hash";
import { HTTPError } from "./helperFunction";

export class AdminService {
  constructor(private client: Client) {}

  async getData() {
    try {
      let result = await this.client.query(`
      select id, username, deactivated_time from "user" 
      where role = 'staff' order by id
      `);
      return result.rows;
    } catch (error) {
      throw new HTTPError(500, String(error));
    }
  }

  async addStaff(user: { username: string; password: string }) {
    try {
      let hash_password = await hashPassword(user.password);
      let role = "staff";
      let is_vip = false;
      let discount = 20;
      let binding = [
        user.username.toLowerCase(),
        hash_password,
        role,
        discount,
        is_vip,
      ];
      let sql = `insert into "user" (username, password, role, discount, is_vip ) 
      values ($1, $2, $3, $4, $5 ) returning id`;
      let result = await this.client.query(sql, binding);
      return result.rows[0];
    } catch (error) {
      throw new HTTPError(500, String(error));
    }
  }

  async updateStatus(user: { id: number; status: string }) {
    try {
      if (user.status == "deactivate") {
        await this.client.query(
          `update "user" set deactivated_time = CURRENT_TIMESTAMP where id = $1`,
          [user.id]
        );
      }
      if (user.status == "activate") {
        await this.client.query(
          `update "user" set deactivated_time = null where id = $1`,
          [user.id]
        );
      }
      return {};
    } catch (error) {
      throw new HTTPError(500, String(error));
    }
  }
}
