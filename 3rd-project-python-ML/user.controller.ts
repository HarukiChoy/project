import { RestfulController } from "./restful.controller";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { HTTPError } from "./helper.function";
// import "./session";

export class UserController extends RestfulController {
  constructor(private userService: UserService) {
    super();
    this.router.post("/register", this.register);
    this.router.post("/login", this.login);
  }

  register = async (req: Request, res: Response) => {
    try {
      let { username, password_1, password_2 } = req.body;
      if (!username || !password_1 || !password_2) {
        throw new HTTPError(400, "Missing username or password.");
      }
      //   if (!email) {
      //     throw new HTTPError(400, "Missing Email");
      //   }
      if (
        typeof username !== "string" ||
        typeof password_1 !== "string" ||
        typeof password_2 !== "string"
      ) {
        throw new HTTPError(
          400,
          "Invalid username or password, please try again."
        );
      }
      if (password_1 !== password_2) {
        throw new HTTPError(400, "Two password does not match.");
      }
      let user = Object({ username, password_1 });

      let json = await this.userService.register(user);

      if (!json) {
        return;
      }

      //   req.session.user = {id: json.id,};
      //   req.session.save();
      //   let role = req.session.user.role;
      res.status(202);
      console.log("User successfully register a new account.");
      res.json(json);
    } catch (error) {
      res.json({ error: String(error) });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      let { username, password } = req.body;

      if (!username || !password) {
        throw new HTTPError(400, "Missing username or password.");
      }
      if (typeof username !== "string" || typeof password !== "string") {
        throw new HTTPError(
          400,
          "Invalid username or password, please try again."
        );
      }
      let user = Object({ username, password });

      let userId = await this.userService.login(user);
      console.log("json", userId);

      if (!userId) {
        res.status(400);
        res.json({ error: "Failed to Login." });
      }
      res.status(400);
      res.json(userId);
    } catch (error) {
      // TODO
      res.json({ error: String(error) });
    }
  };
}
