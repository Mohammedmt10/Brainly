import { ShareIcon } from "../Icons/ShareIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ObjectId } from "mongoose";


interface CardInterface {
    _id? : ObjectId,
    type : string,
    link : string,
    title : string,
    ytvideos? : boolean,
    tweets? : boolean
}

export default function CardElement(props : CardInterface) {
    let share = false;

    
    async function sharelink () {
        share = true;
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
            share : share
        },{
            headers : {
                'authorization' : localStorage.getItem("token")
            }
        })
        //@ts-ignore
        const link : string = `${response.data?.link}`;
        navigator.clipboard.writeText(link);
    }
    
    async function deleteContent() {


        await axios.delete(`${BACKEND_URL}/api/v1/content`,{
            //@ts-ignore
            contentId : props._id,
            headers : {
                'authorization' : localStorage.getItem('token')
            }
        },)
        
    }
    
    
    return <div className="">
{props.type == "twitter" && <div className={`${props.tweets ? "relative":"hidden"} p-3 bg-white px-4 h-fit w-fit min-w-60`}>
        <div className="flex justify-between  items-center ">
            <div className="text-2xl font-medium pb-3">
                {props.title}
            </div>
            <div className="flex items-center gap-4">
                <div className="hover:cursor-pointer" onClick={sharelink}>
                    <ShareIcon />
                </div>
                <div className="hover:cursor-pointer" onClick={deleteContent}>
                  <DeleteIcon />
                </div>
            </div>
        </div>
        <div className="flex-wrap">
            {
              <div>
                <blockquote className="twitter-tweet">
                    <a href={props.link.replace("x.com", "twitter.com")}></a>
                </blockquote>
                </div>
            }
        </div>
    </div>}
    {props.type == "youtube" && props.ytvideos == true && <div className="p-3 bg-white px-4 h-fit w-fit min-w-60">
        <div className="flex justify-between  items-center ">
            <div className="text-2xl font-medium pb-3">
                {props.title}
            </div>
            <div className="flex items-center gap-4">
                <div className="hover:cursor-pointer" onClick={sharelink}>
                    <ShareIcon />
                </div>
                <div className="hover:cursor-pointer" onClick={deleteContent}>
                  <DeleteIcon />
                </div>
            </div>
        </div>
        <div className="flex-wrap">
            {<div>
                    <iframe className="p-1" src={props.link.replace("watch", "embed").replace("?v=", "/")}
                     title="YouTube video player" frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                     referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>}
        </div>
    </div>}
    </div> 
}