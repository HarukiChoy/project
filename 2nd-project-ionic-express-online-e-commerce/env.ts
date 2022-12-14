// version 1
import { populateEnv } from "populate-env";
import dotenv from "dotenv";

dotenv.config();

export let env = {
  DB_NAME: "",
  DB_USER: "",
  DB_PASSWORD: "",
  SESSION_SECRET: "",
};

populateEnv(env, { mode: "halt" });
