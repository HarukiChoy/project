import { Client } from "pg";
import { HTTPError } from "./helperFunction";

export class ItemService {
  constructor(private client: Client) {}
  async getItem() {
    try {
      let result = await this.client.query(`
        select id, name, price, photo, category from item
         where is_product is true and deactivated_time is null
        `);
      return result.rows;
    } catch (error) {
      throw new HTTPError(500, "Failed to load item info.");
    }
  }

  async getCategory() {
    try {
      let result = await this.client.query(`select * from item`);
      return result.rows;
    } catch (error) {
      throw new HTTPError(500, "Failed to load item info.");
    }
  }
}
