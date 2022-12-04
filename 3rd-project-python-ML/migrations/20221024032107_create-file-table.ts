import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("file", (t) => {
    t.increments("id");
    t.string("filename", 255).notNullable();
    t.string("file_path", 255).notNullable();
    t.integer("user_id").notNullable().references("id").inTable("user");
    t.timestamp("uploaded_at").notNullable();
    t.timestamp("finished_at").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("file");
}
