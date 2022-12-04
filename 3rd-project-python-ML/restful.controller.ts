import { Router } from "express";
import { Request, Response } from "express";
import { HTTPError } from "./helper.function";

export class RestfulController {
  router = Router();

  wrapMethod(fn: (req: Request) => object) {
    return async (req: Request, res: Response) => {
      try {
        let json = await fn(req);
        res.json(json);
      } catch (error) {
        res.status((error as HTTPError)?.status || 500);
        res.json({ error: String(error) });
      }
    };
  }
}
