import { Knex } from "knex";
import { checkPassword, hashPassword } from "./hash";
import { HTTPError } from "./helper.function";

export class UserService {
  constructor(private knex: Knex) {}

  async register(user: { username: string; password_1: string }) {
    try {
      let hash = await hashPassword(user.password_1);
      let query = await this.knex("user")
        .insert({
          username: user.username,
          password: hash,
        })
        .returning("id");
      return query[0]; //which is an object like {id: ?}
    } catch (error) {
      throw new HTTPError(500, String(error));
    }
  }

  async login(user: { username: string; password: string }) {
    try {
      let lookup = await this.knex
        .select("id", "username", "password")
        .from("user")
        .where("username", user.username);
      console.log(lookup.length);
      if (lookup.length == 0) {
        throw new HTTPError(400, "User not found.");
      }
      console.log("lookup", lookup);

      let match = await checkPassword(user.password, lookup[0].password);
      if (match == false) {
        throw new HTTPError(400, "Wrong Password.");
      }
      return lookup[0].id;
    } catch (error) {
      throw new HTTPError(500, String(error));
    }
  }
}
