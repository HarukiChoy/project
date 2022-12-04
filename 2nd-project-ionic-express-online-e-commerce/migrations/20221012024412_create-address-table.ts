import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("address", (t) => {
    t.increments("id");
    t.string("address", 50);
    t.integer("district_id").references("district.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("address");
}
