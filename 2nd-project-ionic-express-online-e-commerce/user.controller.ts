import { RestfulApiController } from "./restful.controller";
import { UserService } from "./user.service";
import { HTTPError } from "./helperFunction";
import { Request, Response } from "express";
import "./session";

export class UserController extends RestfulApiController {
  constructor(private userService: UserService) {
    super();
    this.router.post("/signup", this.signup);
    this.router.post("/login", this.login);
    this.router.get("/profile", this.profile);
    this.router.get("/toCart", this.toCart);
    this.router.post("/logout", this.logout);
    this.router.get("/vip", this.checkVIP);
  }

  signup = async (req: Request, res: Response) => {
    try {
      let { username, password, re_password, email } = req.body;
      if (!username || !password || !re_password) {
        throw new HTTPError(400, "Missing username or password");
      }
      if (!email) {
        throw new HTTPError(400, "Missing Email");
      }
      if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof re_password !== "string"
      ) {
        throw new HTTPError(
          400,
          "Invalid username or password, please try again."
        );
      }
      if (password !== re_password) {
        throw new HTTPError(400, "Two password does not match");
      }
      let user = Object({ username, password, email });

      let json = await this.userService.signup(user);

      if (!json) {
        return;
      }
      req.session.user = {
        id: json.id,
        username: json.username,
        role: json.role,
      };

      req.session.save();
      let role = req.session.user.role;
      res.status(202);
      res.json({ role });
    } catch (error) {
      res.status(500);
      res.json({ error: String(error) });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      let { username, password } = req.body;
      if (!username || !password) {
        res.status(400);
        res.json({ error: "Missing username or password" });
        return;
      }
      if (typeof username !== "string" || typeof password !== "string") {
        res.status(400);
        res.json({ error: "Invalid username or password, please try again." });
        return;
      }

      let user = Object({ username, password });
      let json = await this.userService.login(user);
      if (!json) {
        res.status(500);
        res.json({ error: "Failed to login" });
      }

      req.session.user = {
        id: json.id,
        username: json.username,
        role: json.role,
      };

      req.session.save();
      let role = req.session.user.role;
      console.log("User successfully login");
      res.status(202);
      res.json({ role });
    } catch (error) {
      res.status(500);
      res.json({ error: String(error) });
    }
  };

  profile = (req: Request, res: Response) => {
    switch (req.session.user?.role) {
      case "admin":
        res.redirect("/admin/admin.html");
        break;
      case "staff":
        res.redirect("/staff.html");
        break;
      case "customer":
        res.redirect("/customer.html");
        break;
      default:
        res.redirect("/login.html");
    }
  };

  toCart = (req: Request, res: Response) => {
    if (req.session.user) {
      res.redirect("/cart.html");
    } else {
      res.redirect("/login.html");
    }
  };

  logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500);
        res.end("Failed to logout");
        return;
      }
      res.status(202);
      res.end();
      return;
    });
  };

  checkVIP = async (req: Request, res: Response) => {
    try {
      let id = req.session.user!.id;
      let json = await this.userService.checkVIP(id);
      if (!json) {
        res.status(400);
        res.json({ error: "Failed to get info correctly" });
      }
      res.status(200);
      res.json(json);
    } catch (error) {
      res.status(400);
      res.json({ error: String(error) });
    }
  };
}
