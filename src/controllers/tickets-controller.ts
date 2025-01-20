import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import {z} from "zod"

class TicketsController{

    async create(request: Request, response: Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                equipment: z.string().min(3).max(15),
                description: z.string().min(8).max(50),
                user_name: z.string().min(3).max(15),
                status: z.string().optional(),
            })

            const {equipment, description, user_name, status} = bodySchema.parse(request.body)

            await knex<TicketsRepository>("tickets").insert({equipment, description, user_name, status})

            return response.status(201).json()

        } catch (error) {
            next(error)
        }
    }
}

export{TicketsController}