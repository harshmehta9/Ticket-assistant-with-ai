import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import type { CheckAuthProps } from "../types/user";



function CheckAuth({children, protectedRoute} : CheckAuthProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(protectedRoute){
            if(!token){
                navigate("/login")
            }else{
                setLoading(false);
            }
        }else{
            if(token){
                navigate('/')
            }else{
                setLoading(false);
            }
        }

    },[protectedRoute, navigate]);

    if(loading){
        return <div>Loading...</div>
    }
  return (
    <div>{children}</div>
  )
}

export default CheckAuth;