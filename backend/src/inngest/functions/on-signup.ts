import { inngest } from "../inngest";
import { send_welcome_email } from "../../utils/mailer";
import User from "../../models/user";
import { NonRetriableError } from "inngest";
import { IUser } from "../../types/user";

export const userSignup = inngest.createFunction(
    {id: "on-user-signup", retries: 2 },
    {event: "user/signup"},
    async ({event, step}) => {
        try {
            const {email} = event.data;
            const user = await step.run("get_user_email", async () => {
                const foundUser = await User.findOne({email: email})
                if(!foundUser){
                    throw new NonRetriableError("User no longer exist in our database")
                }
                return foundUser;
            })

            await step.run("send_welcome_email", async () => {
                await send_welcome_email((user as IUser).email);

            })
            
            return {success: true}
        

        } catch (error) {
            console.error("Error running email steps: ", error)
        }
    }
)