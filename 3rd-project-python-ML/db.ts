import Knex from "knex";
let config = require("./knexfile");
let profile = config.development;
export let knex = Knex(profile);
