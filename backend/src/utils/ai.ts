import { createAgent, gemini } from "@inngest/agent-kit";
import { aiResponceTicket } from "../types/ticket";



export const analyzeTicket = async(ticket: any) => {

    const supportAgent = createAgent({
        name: "Ticket Analyzer",
        description: "Analyze the ticket and catogrize it based on the skill",
        system: `You are an expert AI assistant that processes technical support tickets. 
    Your job is to:
    1. Summarize the issue.
    2. Estimate its priority.
    3. Provide helpful notes and resource links for human moderators.
    4. List relevant technical skills required.

    IMPORTANT:
    - Respond with *only* valid raw JSON.
    - Do NOT include markdown, code fences, comments, or any extra formatting.
    - The format must be a raw JSON object.

    Repeat: Do not wrap your output in markdown or code fences.`,
        model: gemini({
            model:'gemini-1.5-flash',
            apiKey: process.env.GEMINI_API_KEY,
            

        })
    })

    const responce = await supportAgent.run(
        `You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
        
Analyze the following support ticket and provide a JSON object with:

- summary: A short 1-2 sentence summary of the issue.
- priority: One of "low", "medium", or "high".
- helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
- relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

{
"summary": "Short summary of the ticket",
"priority": "high",
"helpfulNotes": "Here are useful tips...",
"relatedSkills": ["React", "Node.js"]
}

---
Ticket information:

- Title: ${ticket.title}
- Description: ${ticket.description}`
);

const rawResponse =  (responce.output[0] as any).content;

const output = JSON.parse(rawResponse) as aiResponceTicket;

try {
    if(typeof output === 'object'){
        return output;
    }else{
        throw new Error("No a valid AI responce");
    }
} catch (error) {
    return false;
}

}