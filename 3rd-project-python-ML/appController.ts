import { Request, Response } from "express";
import { AppService } from "./appService";
import { HTTPError } from "./helper.function";
import { RestfulController } from "./restful.controller";
import formidable from "formidable";
import fs from "fs";

// const uploadDir = "yolov5/dataset/text/images/test/";
const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

export class AppController extends RestfulController {
  constructor(private appService: AppService) {
    super();
    this.router.post("/login", this.wrapMethod(this.login));
    this.router.post("/register", this.wrapMethod(this.register));
    // this.router.post("/upload_doc", this.wrapMethod(this.uploadDocument));
    // this.router.post("/upload_paper", this.wrapMethod(this.uploadPaper));
  }

  login = async (req: Request) => {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new HTTPError(400, "Please enter all fields.");
    }

    if (typeof username !== "string" || typeof password !== "string") {
      throw new HTTPError(400, "Invalid input. Please enter a string.");
    }

    const user = { username, password };
    let json = await this.appService.login(user);

    req.session["userID"] = json.userID;
    req.session["last_login"] = new Date().getTime();
    req.session.save();

    return json;
  };

  register = async (req: Request) => {
    const { username, password_1, password_2 } = req.body;
    if (!username || !password_1 || !password_2) {
      throw new HTTPError(400, "Please enter all fields.");
    }

    if (
      typeof username !== "string" ||
      typeof password_1 !== "string" ||
      typeof password_2 !== "string"
    ) {
      throw new HTTPError(400, "Invalid input. Please enter a string.");
    }

    if (password_1 !== password_2) {
      throw new HTTPError(
        400,
        "Passwords entered are not matched. Please try again."
      );
    }

    const user = { username, password_1 };
    let json = await this.appService.register(user);

    req.session["userID"] = json.userID;
    req.session["last_login"] = new Date().getTime();
    req.session.save();

    return json;
  };

  uploadDocument = async (req: Request, res: Response) => {
    try {
      if (!req.session["userID"]) {
        throw new HTTPError(403, "Please login first.");
      }

      let upload_file = undefined;
      const userID = req.session["userID"];

      const form = formidable({
        uploadDir,
        keepExtensions: true,
        maxFiles: 1,
        maxFileSize: 20 * 1024 ** 2,
        filter: (part) => {
          return (
            part.mimetype?.startsWith("image/") ||
            part.mimetype === "application/pdf" ||
            false
          );
        },
      });

      form.parse(req, async (err, fields, files) => {
        if (!files.file) {
          return { msg: "Please upload first." };
        }

        // if (Array.isArray(files.file)) {

        // }
        upload_file = files.file as formidable.File;

        let json = await this.appService.uploadDocument(
          {
            filePath: upload_file.filepath,
            filename: upload_file.originalFilename!,
          },
          userID
        );

        console.log("controller json", json);

        res.status(200).json(json);
        return;
      });
    } catch (error) {
      res.status((error as HTTPError).status || 500);
      res.json({ error: String(error) });
    }
  };

  uploadPaper = async (req: Request, res: Response) => {
    try {
      if (!req.session["userID"]) {
        throw new HTTPError(403, "Please login first.");
      }

      let upload_file = undefined;
      const userID = req.session["userID"];

      const form = formidable({
        uploadDir,
        keepExtensions: true,
        maxFiles: 1,
        maxFileSize: 20 * 1024 ** 2,
        filter: (part) => {
          return (
            part.mimetype?.startsWith("image/") ||
            part.mimetype === "application/pdf" ||
            false
          );
        },
      });

      form.parse(req, async (err, fields, files) => {
        if (!files.file) {
          return { msg: "Please upload first." };
        }

        // if (Array.isArray(files.file)) {

        // }
        upload_file = files.file as formidable.File;

        let json = await this.appService.uploadPaper(
          {
            filePath: upload_file.filepath,
            filename: upload_file.originalFilename!,
          },
          userID
        );

        console.log("controller json", json);
        res.status(200).json(json);
        return;
      });
    } catch (error) {
      res.status((error as HTTPError).status || 500);
      res.json({ error: String(error) });
    }
  };

  // uploadWord = async (req: Request, res: Response) => {
  //   try {
  //     if (!req.session["userID"]) {
  //       throw new HTTPError(403, "Please login first.");
  //     }

  //     let upload_file = undefined;
  //     const userID = req.session["userID"];

  //     const form = formidable({
  //       uploadDir,
  //       keepExtensions: true,
  //       maxFiles: 1,
  //       maxFileSize: 20 * 1024 ** 2,
  //       filter: (part) => {
  //         return part.mimetype?.startsWith("image/") || false;
  //       },
  //     });

  //     form.parse(req, async (err, fields, files) => {
  //       if (!files.file) {
  //         return { msg: "Please upload first." };
  //       }

  //       // if (Array.isArray(files.file)) {

  //       // }
  //       upload_file = files.file as formidable.File;

  //       let json = await this.appService.uploadWord(
  //         {
  //           filePath: upload_file.filepath,
  //           filename: upload_file.originalFilename!,
  //         },
  //         userID
  //       );

  //       console.log("controller json", json);
  //       res.status(200).json(json);
  //       return;
  //     });
  //   } catch (error) {
  //     res.status((error as HTTPError).status || 500);
  //     res.json({ error: String(error) });
  //   }
  // };
}
