import { TicketsController } from "@/controllers/tickets-controller";
import { Router } from "express";

const ticketsRoutes = Router()
const ticketsController = new TicketsController

ticketsRoutes.post("/", ticketsController.create)

export {ticketsRoutes}