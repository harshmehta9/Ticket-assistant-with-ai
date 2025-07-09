import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { createTicket, getTicket, getTickets, getUserTickets } from "../controllers/ticket";

const ticketRouter = Router();

ticketRouter.post("createTicket", authMiddleware(), createTicket) //create tickect
ticketRouter.get("getUserTickets", authMiddleware(), getUserTickets); // user requested all tickets
ticketRouter.get("gettickets", authMiddleware("admin"), getTickets); // all tickets with details for admin
ticketRouter.get("getticket/:id", authMiddleware(), getTicket); //get ticket based on :id

export default ticketRouter;