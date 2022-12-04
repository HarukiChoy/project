import { Request, Response } from "express";
import { checkRole } from "./helperFunction";
import { RestfulApiController } from "./restful.controller";
import { ShipmentService } from "./shipment.service";

export class ShipmentController extends RestfulApiController {
  constructor(private shipmentService: ShipmentService) {
    super();
    this.router.get("/area", this.getArea);
    this.router.get("/district", this.getDistrict);
  }
  getArea = async (req: Request, res: Response) => {
    try {
      checkRole(req);
      let areas = await this.shipmentService.getArea();
      res.json(areas);
    } catch (error) {
      res.status(500);
      res.json({ error: String(error) });
    }
  };
  getDistrict = async (req: Request, res: Response) => {
    try {
      checkRole(req);
      let { area } = req.query;
      let districts = await this.shipmentService.getDistrictId(String(area));
      res.json(districts);
    } catch (error) {
      res.status(500);
      res.json({ error: String(error) });
    }
  };
}
