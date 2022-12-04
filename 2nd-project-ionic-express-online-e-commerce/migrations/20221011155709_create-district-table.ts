import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("district", (t) => {
    t.increments("id");
    t.string("district", 5);
    t.integer("area_id").references("area.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("district");
}
