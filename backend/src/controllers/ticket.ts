import Ticket from "../models/ticket";
import {inngest} from "../inngest/inngest";
import { Request, Response } from "express";
import User from "../models/user";

//create ticket
export const createTicket = async(req: Request, res: Response) => {
    const {title, description} = req.body;
    try {
        if(!title || !description){
            res.status(400).json({success: false, message: "Title are description is required!"})
            return;
        }

        const newTicket = await Ticket.create({
            title,
            description, 
            createdBy: req.userinfo?._id.toString(),
        })    

        let ticketId = newTicket._id;

        await inngest.send({name: "ticket/created", data: {
            ticketId,
            title,
            description,
            createdBy: req.userinfo?._id,
        }})

        res.status(201).json({success: true, ticket: newTicket})    
    } catch (error) {
        console.error("Error creating error", error);
        res.status(500).json({success: false, message: "Failed to create Ticket"})
    }
}

// Get all tickets with user details -- only for admins
export const getTickets = async(req: Request, res: Response) => {
    try {
        const allTickets = await Ticket.find().populate('assignedTo',['email', '_id']);
        res.status(200).json({})
    } catch (error) {
        
    }
}

// Get all the user tickets they created  
export const getUserTickets = async(req: Request, res: Response) => {
    const userId = req.userinfo?._id;
    try {
       const allTicketsByUser = await Ticket.find({createdBy: userId}).select("title description status createdAt")
            .sort({createdAt: -1 });
       if(!allTicketsByUser){
        res.status(400).json({success: false, message: "Failed to find User Ticket"})
        return;
       }

       res.status(200).json({success: true, tickets: allTicketsByUser});
       
    } catch (error) {
       console.error("Error getting user Tickets ", error);
       res.status(500).json({success: false, message: "Internal server error"}) 
    }
}

//Request ticket based req params
export const getTicket = async (req: Request, res: Response) => {
    try {
        const user = req.userinfo;
        let ticket;
        

        if(user?.role !== "user"){
            ticket = Ticket.findById(req.params.id).populate("assignedTo", ['email', '_id'])
        }else{
            ticket = Ticket.findOne({
                createdBy: user._id,
                _id: req.params.id
            }).select("title description status createdAt")
        }

        if(!ticket){
            res.status(404).json({success: false, message: "Could not find the ticket"})
            return;
        }

        res.status(200).json({success: true, ticket})
    } catch (error) {
        console.log("Error finding ticket ", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}