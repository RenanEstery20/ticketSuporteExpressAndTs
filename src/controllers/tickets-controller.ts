import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

class TicketsController {

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                equipment: z.string().min(3).max(15),
                description: z.string().min(8).max(50),
                user_name: z.string().min(3).max(15),
                status: z.string().default("open"),
            })

            const { equipment, description, user_name, status } = bodySchema.parse(request.body)

            await knex<TicketsRepository>("tickets").insert({ equipment, description, user_name, status })

            return response.status(201).json()

        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { status } = request.query
            const tickets = await knex<TicketsRepository>("tickets")
                .select()
                .whereLike("status", `%${status ?? ""}%`)
            return response.json(tickets)
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string().transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a number" })
                .parse(request.params.id)

            const bodySchema = z.object({
                equipment: z.string().min(3).max(15),
                description: z.string().min(8).max(50),
            })

            const { equipment, description } = bodySchema.parse(request.body)

            const ticket = await knex<TicketsRepository>("tickets")
                .select()
                .where({ id })
                .first()

            if (!ticket) {
                throw new AppError("product not found")
            }

            await knex<TicketsRepository>("tickets")
                .update({ equipment, description, updated_at: knex.fn.now() })
                .where({ id })


            return response.json()
        } catch (error) {
            next(error)
        }

    }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string().transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a number" })
                .parse(request.params.id)

            const ticket = await knex<TicketsRepository>("tickets")
                .select()
                .where({ id })
                .first()

            if (!ticket) {
                throw new AppError("product not found")
            }

            await knex<TicketsRepository>("tickets")
            .delete()
            .where({ id })

            return response.json()
        } catch (error) {
            next(error)
        }

    }
}

export { TicketsController }