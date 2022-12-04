import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user", (t) => {
    t.increments("id");
    t.string("username", 60).notNullable().unique();
    t.string("password", 60).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user");
}
