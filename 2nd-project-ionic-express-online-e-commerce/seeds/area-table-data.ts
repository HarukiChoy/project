import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("area").del();

  // Inserts seed entries
  await knex("area").insert([
    { area: "港島" },
    { area: "九龍" },
    { area: "新界" },
  ]);
}
