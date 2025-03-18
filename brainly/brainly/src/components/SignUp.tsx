import { useRef } from "react";
import Button from "./ui/Buttons";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios-typescript";

export function SignUp() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const Navigate = useNavigate();
    async function signUp() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value
        console.log("hi there")
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username : username,
            password : password 
        })
        console.log(response)
        Navigate("/signin")

        alert("You are signed in");

    }
    return <div className="fixed h-screen w-screen bg-white flex justify-center
     items-center">
        <div>
            <div className="text-3xl">SignUp</div> 
             <br />
            Username : <br />
            <input ref= {usernameRef} className="p-2 border-black border-2 my-2" placeholder="Username" type="text" name="" id="" /> <br />
            Password : <br />
            <input ref={passwordRef} className="p-2 border-black border-2 my-2" placeholder="Password" type="text" name="" id="" /> <br /> <br />
            <Button onClick={signUp} text="SignUp" variant="primary" size="lg" />
        </div>

    </div>
}