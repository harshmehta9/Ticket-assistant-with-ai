export interface IUser{
    name: string, 
    email: string, 
    password: string,
    role: "user" | "moderator" | "admin",
    skills: string, 
    createdAt: Date
}

