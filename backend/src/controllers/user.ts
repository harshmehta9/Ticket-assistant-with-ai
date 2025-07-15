import bcrypt from "bcrypt";
import { IUser } from "../types/user";
import { analyzeTicket } from "../utils/ai";
import User from "../models/user";
import jwt from "jsonwebtoken";
import {inngest} from "../inngest/inngest"
import { Request, Response } from "express";




export const SignUp = async (req: Request, res: Response): Promise<void> => {
    const {name, email, password, skills = []} = req.body;

    if(!name || !email || !password ) {
         res.status(400).json({message: "Fields are missing"});
         return;
    }

    const user = await User.findOne({email: email})
    if(user){
        res.status(400).json({success: false, message: "User already exits"})
        return;
    }

   try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({name, email, password: hashedPassword, skills})

    await inngest.send({
        name: "user/signup",
        data: {
            email: email
        }
    })

    const token = jwt.sign({_id: newUser._id, role: newUser.role, }, process.env.JWT_SECRET!, {expiresIn: "1d"});

    res.status(201).json({success: true, token: token, user: {
        name: name, 
        email: email,
        skills: skills

    }});

   } catch (error) {
    res.status(500).json({messsage: "Something Failed on server side"}) 
   }
    
}


export const login = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email: email});
        if(!existingUser){
            throw new Error("User does not exits, Create a account!")
        }

        const isCorrectPassword = await bcrypt.compare(password, existingUser.password);
        if(!isCorrectPassword){
            throw new Error("Password is incorrect");
        }


        const token = jwt.sign({_id: existingUser._id, role: existingUser.role, name: existingUser.name }, process.env.JWT_SECRET!, {expiresIn: "1d"});
        
        res.status(200).json({success: true, token: token, user:
             {
                name: existingUser.name, 
                email: existingUser.email, 
                role: existingUser.role, 
                skills: existingUser.skills
             }})

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Something Failed on server side" });
    }

}


export const updateUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.userinfo?._id;

    if (!user_id) {
       res.status(400).json({ success: false, message: "User ID not found" });
       return;
    }

    const allowedUpdates = ["name", "email", "phone"];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedUpdates.includes(key))
    );

    if (Object.keys(updates).length === 0) {
       res.status(400).json({ success: false, message: "No valid fields to update" });
       return;
    }

    const updatedUser = await User.findByIdAndUpdate(user_id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
       res.status(404).json({ success: false, message: "User not found" });
       return;
    }

    res.status(200).json({ success: true, message: "User updated", updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const getUsers = async(req: Request, res: Response) => {
    try {
        const allUsers = await User.find().select("-password");
        res.status(200).json({success: true, data: allUsers})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

}


