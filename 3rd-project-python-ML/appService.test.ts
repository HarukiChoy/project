import knex from "knex";
import { AppService } from "./appService";

// import { Request, Response } from "express";

const knexConfig = require("./knexfile");
const TEST_KNEX = knex(knexConfig["test"]);

// const req = {
//   headers: {},
//   body: {},
// };
// const res = {
//   json: {},
// };

describe("appService", () => {
  let appService: AppService;
  const user1 = {
    username: "",
    password: "1234",
  };
  const user2 = {
    username: "gary",
    password: "123",
  };
  const user3 = {
    username: "gary",
    password: "1234",
  };

  beforeEach(() => {
    appService = new AppService(TEST_KNEX);
  });

  afterAll(() => {
    TEST_KNEX.destroy();
  });

  it("should throw error with non-existing username", async () => {
    expect(await appService.login(user1)).toEqual({
      msg: "Login failed. No such user. Please register first.",
    });
  });

  it("should throw error with wrong password", async () => {
    expect(await appService.login(user2)).toEqual({
      msg: "Login failed. Wrong password is entered.",
    });
  });

  it("should login successfully with proper username and password", async () => {
    expect(await appService.login(user3)).toHaveProperty("userID");
  });
});

// describe("appController", () => {
//   let appController: AppController;
//   let service: AppService;
//   beforeEach(() => {
//     appController = new AppController(service);
//   });

//   it("should throw error when missing username", () => {
//     expect(() => {
//       appController.login(req as Request, res as Response);
//     }).toThrowError();
//   });
// });
