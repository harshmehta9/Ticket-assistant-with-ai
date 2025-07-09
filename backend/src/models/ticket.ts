import mongoose, { Model, model, Schema } from "mongoose";
import { ITicket } from "../types/ticket";

const TicketSchema = new Schema<ITicket>({
    title: {type: String, required: true}, 
    description: String, 
    status: {type: String, default: "TODO"},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},
    priority: String,
    deadline: String,
    helpfulNotes: String, 
    relatedSkills: [String],
    createdAt: Date,
})

const Ticket: Model<ITicket> = model("Ticket", TicketSchema);
export default Ticket;