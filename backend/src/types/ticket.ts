import mongoose from "mongoose";
export interface ITicket{
    _id: string,
    title: string, 
    description: string, 
    status: string,
    createdBy: mongoose.Types.ObjectId, 
    assignedTo: mongoose.Types.ObjectId,
    priority: string,
    deadline: string,
    helpfulNotes: string,
    relatedSkills: [string],
    createdAt: Date,
}

export interface aiResponceTicket{
    summary: string, 
    priority: string,
    helpfulNotes: string,
    relatedSkills: [string],
}