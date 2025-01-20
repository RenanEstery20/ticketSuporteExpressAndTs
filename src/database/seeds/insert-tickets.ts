import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("tickets").del();

    await knex("tickets").insert([
        {
            equipment: "Laptop",
            description: "Tela com manchas",
            user_name: "Joao123",
            status: "pending"
        },
        {
            equipment: "Monitor",
            description: "Problemas de brilho",
            user_name: "Carlos987",
            status: "resolved"
        },
        {
            equipment: "Mouse",
            description: "Sensor parou de funcionar",
            user_name: "LuizAdmin",
            status: "pending"
        },
        {
            equipment: "Servidor",
            description: "Desligamento inesperado",
            user_name: "Tech_Gabriel",
            status: "in_progress"
        }
    ]);
}
