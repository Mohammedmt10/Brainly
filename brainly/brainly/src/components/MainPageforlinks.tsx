import CardElement from "./Card"
import { useShare } from "../Hooks/useSharedContent"
import { useEffect } from "react"

import { toshow } from "../utils"

export function MainContents(props : toshow) {

    const {contents , refresh} = useShare()

    useEffect(()=>{
        refresh();
    },[])

    return <div className="bg-[#f2f5f6] border-2 border-[#c0c3c5] pt-9 pl-10 w-screen">
        <div className="text-2xl font-medium">
        Shared Contents
        </div>
        <div className="flex-wrap flex mt-8">
            {contents && contents.map(({type , title , link}) => <CardElement 
                    type={type}
                     title={title}            
                    link={link}
                    ytvideos={props.ytvideos}
                    tweets={props.tweets}
             />)}
        </div>
    </div>
}