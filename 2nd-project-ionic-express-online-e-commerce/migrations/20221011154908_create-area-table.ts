import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("area", (t) => {
    t.increments("id");
    t.string("area", 2);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("area");
}
