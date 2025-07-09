// Write this middleware yourself
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface jsonPaylodUser{
    _id: string, 
    role: string
}

declare global {
    namespace Express {
        interface Request {
            userinfo?: jsonPaylodUser;
        }
    }
}

export const authMiddleware = (role?: string) => {
   return (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            res.status(401).json({success: false, messsage: "Auth Header is missing"})
            return;
        }

        //validating Bearer token format
        if(!authHeader.startsWith("Bearer ")){
             res.status(401).json({
                success: false, 
                message: "Invalid Authorization header format. Expected format <Bearer <token>>"
            })
            return;
        }

        const token = authHeader.split(' ')[1];
        
        if(!token){
             res.status(401).json({
                success: false, 
                message: "Token is missing"
            })
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jsonPaylodUser;
        
        //Attaching user to the request to let next router use it (Not ai generated!)
        req.userinfo = decoded;

        // If role is specified, check authorization
        if(role) {
            if(!decoded.role){
                 res.status(400).json({message: "User role is not defined"})
                 return;
            }
            if(decoded.role !== role){
                 res.status(403).json({message: "User is not authorized"})
                 return;
            }
        }

        next();

    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            res.status(401).json({
                success: false,
                message: "Invalid or malformed token"
            })
            return;
        }
    }
   } 
}
