import Button from "./ui/Buttons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function SignIn() {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const Navigate = useNavigate();
    async function signIn() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value
        console.log("hi there")
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username : username,
            password : password 
        }, 
);
        console.log(response.data)
        //@ts-ignore
        console.log(response.data?.token)
        
        //@ts-ignore
        const jwt =response.data?.token
        localStorage.setItem("token" , jwt)
        Navigate("/dashboard")

        alert("You are signed in");

    }

    return <div className="fixed h-screen w-screen bg-white flex justify-center
     items-center">
        <div>
            <div className="text-3xl">SignIn</div> 
             <br />
            Username : <br />
            <input ref={usernameRef} className="p-2 border-black border-2 my-2" placeholder="Username" type="text" name="" id="" /> <br />
            Password : <br />
            <input ref={passwordRef} className="p-2 border-black border-2 my-2" placeholder="Password" type="text" name="" id="" /> <br /> <br />
            <Button onClick={signIn} text="SignIn" variant="primary" size="lg" />
        </div>

    </div>
}