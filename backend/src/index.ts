import express from 'express';
import cors from 'cors';
import connectDB from './config/dbconnect';
import dotenv from "dotenv";
import { userRouter } from './routers/user.router';
import { inngest } from './inngest/inngest';
import {serve} from "inngest/express"
import { userSignup } from './inngest/functions/on-signup';
import { onTicketCreated } from './inngest/functions/on-ticket-creation';
import { Request, Response } from 'express';
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use("/user", userRouter)

//Only start server when DB is connected
app.use("/api/inngest", serve({
    client: inngest,
    functions: [userSignup, onTicketCreated]
}));

app.use("/", (req: Request, res: Response) => {
    res.status(200).json({success: true, message: "Server is working perfectly"});
    return;
});


const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.LOCALHOST_PORT, ()=> {
            console.log(`The server is connected at ${process.env.LOCALHOST_PORT}`)
        })
    } catch (error) {
       console.log("Failed to start server", error);
       process.exit(1); 
    }
}

startServer();