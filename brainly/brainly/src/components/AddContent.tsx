import { CloseIcon } from "../Icons/CloseIcon"
import Button from "./ui/Buttons"
import { AddContentInterface } from "../utils"
import { useState } from "react"
import { useRef } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}


export function AddContent(props : AddContentInterface) {

    const [type , setType] = useState(ContentType.Youtube);
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    async function addcontent() {

        const title = titleRef.current?.value
        const link = linkRef.current?.value

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            title : title,
            link : link,
            type : type
        },{
            headers : {
                'authorization' : localStorage.getItem("token")
            }
        })

        props.setOpen(false)
    }

    return <div className="w-screen h-screen fixed flex justify-center top-0 bg-white bg-opacity-60">

    {props.Open && <div className=" bg-white h-96 w-80 mt-40 border-2 p-3 items-center">
        <div className="float-right cursor-pointer flex" onClick={() => {
            //@ts-ignore
            props.setOpen(false)
        }}><CloseIcon /></div>
    <div className=" w-72 pt-16 pl-7">
        <input ref={titleRef} type="text" placeholder="Title" className="border-2 border-black w-60 p-2" name="" id="" /> <br /><br />
        <input ref={linkRef} type="text" className="border-2 border-black w-60 p-2" placeholder="Link" name="" id="" /> <br /><br />
        <div className="justify-items-center"> <br />
        <div className="flex gap-10 pb-4 pr-4">
            <Button text="Youtube" variant={ type ==ContentType.Youtube?"primary" : "secondary"} size="md" onClick={()=>{
                setType(ContentType.Youtube);
            }} />
            <Button text="Twitter" variant={ type ==ContentType.Twitter?"primary" : "secondary"} size="md" onClick={()=>{
                setType(ContentType.Twitter);
            }} />
        </div>
        <div className="pr-2" onClick={addcontent}>
        <Button text="Submit" variant="primary" size="md" />
        </div>
        </div>
        
    </div>
    </div>}
    </div> 
}