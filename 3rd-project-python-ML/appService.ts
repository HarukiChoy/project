import { Knex } from "knex";
import { checkPassword, hashPassword } from "./hash";
import { HTTPError } from "./helper.function";
import { fetch } from "cross-fetch";

export class AppService {
  constructor(private knex: Knex) {}

  login = async (user: { username: string; password: string }) => {
    const { username, password } = user;
    let queryResult = await this.knex
      .select("id", "password")
      .from("user")
      .where("username", username);

    if (queryResult.length === 0) {
      throw new HTTPError(404, "No such user. Please register.");
    }

    let passwordComparison = await checkPassword(
      password,
      queryResult[0].password
    );

    if (!passwordComparison) {
      throw new HTTPError(409, "Wrong password is entered.");
    }

    await this.knex
      .update({ last_login: new Date() })
      .from("user")
      .where("username", username);

    return {
      userID: queryResult[0].id,
      ok: true,
    };
  };

  register = async (user: { username: string; password_1: string }) => {
    const { username, password_1 } = user;
    let queryResult = await this.knex
      .select("id")
      .from("user")
      .where("username", username);

    if (queryResult.length > 0) {
      throw new HTTPError(409, "Duplicated user.");
    }

    const hash = await hashPassword(password_1);
    let now = new Date();

    let id = await this.knex
      .insert({
        username: username,
        password: hash,
        registered_at: now,
        last_login: now,
      })
      .into("user")
      .returning("id");

    return { userID: id };
  };

  uploadDocument = async (
    file: { filename: string; filePath: string },
    userID: number
  ) => {
    const { filename, filePath } = file;
    const startTime = new Date();
    console.log(1);
    
    // TODO pass the file into OCR
    let result = await fetch("http://0.0.0.0:6000/predict_doc", {
      method: "POST",
      body: JSON.stringify({ filePath }),
    });
    console.log(2);
    
    let json = await result.json();
    console.log("service json:", json);

    let OCRResult = undefined;
    if (json.error) {
      OCRResult = "Conversion error. This file type is not yet supported.";
    } else {
      OCRResult = json.result;
    }

    let endTime = undefined;
    endTime = new Date();
    let fileID = await this.knex
      .insert({
        filename: filename,
        file_path: filePath,
        user_id: userID,
        uploaded_at: startTime.toLocaleString("en-us"),
        finished_at: endTime.toLocaleString("en-us"),
      })
      .into("file")
      .returning("id");

    console.log("service json", { fileID, filePath });

    return {
      fileID,
      filePath,
      conversion_time: endTime.getTime() - startTime.getTime(),
      converted_file: OCRResult,
    };
  };

  uploadPaper = async (
    file: { filename: string; filePath: string },
    userID: number
  ) => {
    const { filename, filePath } = file;
    const startTime = new Date();

    // TODO pass the file into OCR
    await fetch("http://0.0.0.0:6000/upload_paper", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ filePath }),
    });

    let result = await fetch("http://0.0.0.0:6000/predict_paper", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ filePath }),
    });

    let json = await result.json();
    let OCRResult = undefined;
    console.log("service json:", json);

    if (json.error) {
      OCRResult = "Conversion error. This file type is not yet supported.";
    } else {
      OCRResult = json.result;
    }

    const endTime = new Date();
    let fileID = await this.knex
      .insert({
        filename: filename,
        file_path: filePath,
        user_id: userID,
        uploaded_at: startTime.toLocaleString("en-us"),
        finished_at: endTime.toLocaleString("en-us"),
      })
      .into("file")
      .returning("id");

    return {
      fileID,
      filePath,
      conversion_time: endTime.getTime() - startTime.getTime(),
      converted_file: OCRResult,
    };
  };

  // uploadWord = async (
  //   file: { filename: string; filePath: string },
  //   userID: number
  // ) => {
  //   const { filename, filePath } = file;
  //   const startTime = new Date();

  //   let result = await fetch("http://0.0.0.0:6000/predict_word", {
  //     headers: { "Content-Type": "application/json" },
  //     method: "POST",
  //     body: JSON.stringify({ filePath }),
  //   });

  //   let json = await result.json();

  //   let OCRResult = undefined;

  //   if (json.error) {
  //     OCRResult = "Conversion error. This file type is not yet supported.";
  //   } else {
  //     OCRResult = json.result;
  //   }

  //   const endTime = new Date();
  //   let fileID = await this.knex
  //     .insert({
  //       filename: filename,
  //       file_path: filePath,
  //       user_id: userID,
  //       uploaded_at: startTime.toLocaleString("en-us"),
  //       finished_at: endTime.toLocaleString("en-us"),
  //     })
  //     .into("file")
  //     .returning("id");

  //   return {
  //     fileID,
  //     filePath,
  //     conversion_time: endTime.getTime() - startTime.getTime(),
  //     converted_file: OCRResult,
  //   };
  // };
}
