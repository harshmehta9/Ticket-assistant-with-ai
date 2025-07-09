import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`Mongoose Connected: ${connection.connection.host}`);
    } catch (error) {
       console.error("There is a error connnecting ", error);
       process.exit(1); 
    }
}

export default connectDB;