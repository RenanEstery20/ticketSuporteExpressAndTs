import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("tickets", (table) => {
        table.increments("id").primary(),
        table.text("equipment").notNullable(),
        table.text("description").notNullable(),
        table.text("user_name").notNullable(),
        table.text("status").notNullable().defaultTo("open"),
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.timestamp("updated_at").defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("tickets")
}

