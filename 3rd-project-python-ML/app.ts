import express from "express";
import expressSession from "express-session";
import { print } from "listening-on";
// import { UserController } from "./user.controller";
// import { UserService } from "./user.service";
import { knex } from "./db";
import { AppService } from "./appService";
import { AppController } from "./appController";

const app = express();
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  expressSession({
    secret: "tecky_project3",
    resave: true,
    saveUninitialized: true,
  })
);

// let userService = new UserService(knex);
// let userController = new UserController(userService);
// app.use(userController.router);
const appService = new AppService(knex);
const appController = new AppController(appService);
app.use(appController.router);

app.post("/upload_doc", appController.uploadDocument);
app.post("/upload_paper", appController.uploadPaper);
// app.post("/upload_word", appController.uploadWord);

const PORT = 8000;
app.listen(PORT, () => {
  print(PORT);
});
