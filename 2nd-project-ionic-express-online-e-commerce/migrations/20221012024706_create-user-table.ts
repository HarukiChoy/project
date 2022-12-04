import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user", (t) => {
    t.increments("id");
    t.string("username", 50).notNullable().unique();
    t.string("password", 60).notNullable();
    t.string("email", 100).unique();
    t.string("phone_number", 20);
    t.integer("address_id").references("address.id");
    t.integer("birth_month");
    t.string("role", 8).notNullable();
    t.boolean("is_vip");
    t.integer("point");
    t.integer("discount");
    t.decimal("consumption", 2);
    t.decimal("credit", 2);
    t.timestamps("deactivated_time");
  });
}

export async function down(knex: Knex): Promise<void> {}
