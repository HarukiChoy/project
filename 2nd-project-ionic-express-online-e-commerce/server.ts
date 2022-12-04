import express from "express";
import { print } from "listening-on";
import { getSessionAdmin, isLoggedInAPI, getSessionStaff } from "./guard";
import { staffRoute } from "./staff";
import { cartRoute } from "./cart";
import { orderRoutes } from "./order";
import { receiptRoute } from "./receipt-upload";
import { customerRoute } from "./customer";
import { sessionMiddleware } from "./session";
import path from "path";

// MVC import
import { client } from "./db";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { ShipmentService } from "./shipment.service";
import { ShipmentController } from "./shipment.controller";
import { ItemService } from "./item.service";
import { ItemController } from "./item.controller";

let app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(sessionMiddleware);
app.use("/receipt", express.static("receipt"));
app.use("/itemPhoto", express.static("itemPhoto"));

// MVC controller and service
let userService = new UserService(client);
let userController = new UserController(userService);
app.use(userController.router);

let adminService = new AdminService(client);
let adminController = new AdminController(adminService);
app.use("/admin", adminController.router);
app.use("/admin", getSessionAdmin, express.static("admin"));

let shipmentService = new ShipmentService(client);
let shipmentController = new ShipmentController(shipmentService);
app.use("/shipment", shipmentController.router);

let itemService = new ItemService(client);
let itemController = new ItemController(itemService);
app.use("/item", itemController.router);
app.use("/homepage", itemController.router);

// old route
app.use("/customer", isLoggedInAPI, customerRoute);
app.use("/staff", getSessionStaff, staffRoute);
app.use("/order", isLoggedInAPI, orderRoutes);
app.use("/receipt", receiptRoute);
app.use("/cart", isLoggedInAPI, cartRoute);

app.use((req, res) => {
  res.status(404);
  res.sendFile(path.resolve("public", "404.html"));
});

let port = 1840;
app.listen(port, () => {
  print(port);
});
