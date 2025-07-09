import {inngest} from "../inngest";
import { analyzeTicket } from "../../utils/ai";
import Ticket from "../../models/ticket";
import { NonRetriableError } from "inngest";
import { ITicket } from "../../types/ticket";
import { aiResponceTicket } from "../../types/ticket";
import User from "../../models/user";



export const onTicketCreated = inngest.createFunction(
    {id: "on-ticket-created", retries: 2},
    {event: "ticket/created"},
    async ({event, step}) => {
        try {
            //Taking ticketId from the the controller : POST('/user/createTicket')
            const {ticketId} = event.data;

            // Fetching ticket from DB
            const ticket = await step.run("fetch-ticket", async() => {
                const targetTicket = await Ticket.findById(ticketId);
                if(!targetTicket){
                    throw new NonRetriableError("Ticket Not found")
                }

                return targetTicket;
            }) as ITicket;

            await step.run("update-ticket-status",async() => {
                await Ticket.findByIdAndUpdate(ticket._id, {status: "TODO"});

            })

            const aiResponce = await analyzeTicket(ticket);

            const relatedSkills = await step.run("ai-processing", async() => {
                let skills: string[] = [];
                if(aiResponce){
                    if(!['low', 'medium', 'high'].includes(aiResponce.priority)){
                        aiResponce.priority = 'medium'
                    }
                    await Ticket.findByIdAndUpdate(ticket._id, {
                        priority: aiResponce.priority,
                        helpfulNotes: aiResponce.helpfulNotes,
                        summary: aiResponce.summary,
                        relatedSkills: aiResponce.relatedSkills,
                        status: "IN_PROGRESS"
                    })
                    skills = aiResponce.relatedSkills;
                }
                return skills;
            })

            await step.run('assign-moderator' ,async() => {
                let matchModerator = await User.find({role: "moderator",
                     skills: {$elemMatch: {
                        $regex: relatedSkills.join("|"),
                        $options: "i"
                     }} 
                    }
                );
                
                if(!matchModerator){
                    matchModerator = await User.find({role: 'admin'});
                }
                await Ticket.findByIdAndUpdate(ticket._id, {assignedTo: matchModerator});
            })

        } catch (error) {
            console.error("Error running ticket creation : ", error);
        }
    }
)