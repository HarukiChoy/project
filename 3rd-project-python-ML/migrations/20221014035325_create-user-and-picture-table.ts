import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user");
  await knex.schema.createTable("user", (t) => {
    t.increments("id");
    t.string("username", 60).notNullable().unique();
    t.string("password", 60).notNullable();
    t.timestamp("registered_at").notNullable();
    t.timestamp("last_login").notNullable();
  });

  await knex.schema.createTable("picture", (t) => {
    t.increments("id");
    t.string("low_resolution", 255);
    t.timestamp("uploaded_at");
    t.text("caption");
    t.string("high_resolution", 255);
    t.timestamp("upscaled_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user");
  await knex.schema.dropTable("picture");
  await knex.schema.createTable("user", (t) => {
    t.increments("id");
    t.string("username", 60).notNullable().unique();
    t.string("password", 60).notNullable();
  });
}
