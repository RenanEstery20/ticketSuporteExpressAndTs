import {Router} from "express"
import { ticketsRoutes } from "./tickets-routes"


const routes = Router()
routes.use("/tickets", ticketsRoutes)

export{routes}