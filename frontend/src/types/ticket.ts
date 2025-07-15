export interface ITicket{
    _id: string,
    title: string, 
    description: string, 
    status: string,
    createdBy: string, 
    assignedTo: any,
    priority: string,
    deadline: string,
    helpfulNotes: string,
    relatedSkills: [string],
    createdAt: Date,
}