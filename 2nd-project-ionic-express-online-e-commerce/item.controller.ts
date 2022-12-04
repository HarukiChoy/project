import { Request, Response } from "express";
import { ItemService } from "./item.service";
import { RestfulApiController } from "./restful.controller";

export class ItemController extends RestfulApiController {
  constructor(private itemService: ItemService) {
    super();
    this.router.get("/item", this.getItem);
    this.router.get("/category", this.getCategory);
  }

  getItem = async (req: Request, res: Response) => {
    try {
      let products = await this.itemService.getItem();
      for (let product of products) {
        product.cart_quantity = req.session?.item?.[product.id] || 0;
      }
      res.json(products);
    } catch (error) {
      res.status(500);
      res.json({ error: String(error) });
    }
  };
  getCategory = async (req: Request, res: Response) => {
    try {
      let categories = await this.itemService.getCategory();
      res.json(categories);
    } catch (error) {
      res.status(500);
      res.json({ error: String(error) });
    }
  };
}
