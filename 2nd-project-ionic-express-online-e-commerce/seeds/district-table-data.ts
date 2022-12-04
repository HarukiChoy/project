import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("district").del();

  // Inserts seed entries
  let query = knex("district").insert([
    { area_id: 1, district: "中西區" },
    { area_id: 1, district: "灣仔" },
    { area_id: "1", district: "東區" },
    { area_id: "1", district: "南區" },
    { area_id: "2", district: "油尖旺" },
    { area_id: "2", district: "深水埗" },
    { area_id: "2", district: "九龍城" },
    { area_id: "2", district: "黃大仙" },
    { area_id: "2", district: "觀塘" },
    { area_id: "3", district: "葵青" },
    { area_id: "3", district: "荃灣" },
    { area_id: "3", district: "屯門" },
    { area_id: "3", district: "元朗" },
    { area_id: "3", district: "北區" },
    { area_id: "3", district: "大埔" },
    { area_id: "3", district: "沙田" },
    { area_id: "3", district: "西貢" },
    { area_id: "3", district: "離島" },
  ]);
  await query;
}
