import { AdminService } from "./admin.service";
import { RestfulApiController } from "./restful.controller";
import { HTTPError, checkRole } from "./helperFunction";
import { Request, Response } from "express";
import "./session";

export class AdminController extends RestfulApiController {
  constructor(private adminService: AdminService) {
    super();
    this.router.get("/", this.getStaffData);
    this.router.post("/addStaff", this.addStaff);
    this.router.patch("/:id", this.updateStatus);
  }

  getStaffData = async (req: Request, res: Response) => {
    try {
      let role = checkRole(req);
      if (role !== "admin") {
        res.status(403);
        res.json({ error: "You DO NOT have permission to do this" });
        return;
      }
      let json = await this.adminService.getData();
      if (!json) {
        res.status(400);
        res.json({ error: "Cannot find any staff" });
        return;
      }
      res.status(202);
      res.json(json);
    } catch (error) {
      res.status(400);
      res.json({ error: String(error) });
    }
  };

  addStaff = async (req: Request, res: Response) => {
    try {
      let role = checkRole(req);
      if (role !== "admin") {
        res.status(403);
        res.json({ error: "You DO NOT have permission to do this" });
      }
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
      let user = Object({ username, password });
      let json = await this.adminService.addStaff(user);
      if (!json) {
        res.status(500);
        res.json({ error: "Failed to add new staff." });
      }
      let { id } = json;
      res.status(202);
      res.json(id);
    } catch (error) {
      res.status(400);
      res.json({ error: String(error) });
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      let role = checkRole(req);
      if (role !== "admin") {
        res.status(403);
        res.json({ error: "You DO NOT have permission to do this" });
        return;
      }
      let id: number = +req.params.id;
      if (typeof id !== "number") {
        throw new HTTPError(400, "Invalid id number.");
      }
      let { status } = req.query;
      let user = Object({ id, status });
      let json = await this.adminService.updateStatus(user);
      if (!json) {
        throw new HTTPError(500, "Failed to update staff status.");
      }
      res.json({});
    } catch (error) {
      res.status(500);
      res.json({ error: String(error) });
    }
  };
}
