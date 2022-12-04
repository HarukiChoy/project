import { Client } from "pg";
import { HTTPError } from "./helperFunction";

export class ShipmentService {
  constructor(private client: Client) {}

  async getArea() {
    try {
      let result = await this.client.query(`select * from area`);
      return result.rows;
    } catch (error) {
      throw new HTTPError(500, "Failed to get area info.");
    }
  }
  async getDistrictId(area: string) {
    try {
      let result = await this.client.query(
        `select district.district from district inner join area
         on district.area_id = area.id where area.area = $1`,
        [area]
      );
      return result.rows;
    } catch (error) {
      throw new HTTPError(500, "Failed to get district info.");
    }
  }
}
