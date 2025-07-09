import { Router } from "express";
import {  getUsers, login, SignUp, updateUser } from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";
const userRouter = Router();

userRouter.post("/signup", SignUp);
userRouter.post("/login", login)
userRouter.put("/updateuser", authMiddleware("admin"), updateUser);
userRouter.get("/getUsers", authMiddleware("admin"), getUsers )


export { userRouter };