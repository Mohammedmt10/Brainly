import BrainIcon from "../Icons/BrainIcon";
import { TwiterIcon } from "../Icons/TwiterIcon";
import SideBarItem from "./SideBarItem";
import VideosIcon from "../Icons/VidiosIcon"

interface SideBarInterface {
    setytvideos? : Function,
    setTweets? : Function
}

export default function SideBar(props : SideBarInterface) {

    

    return <div className="">
        <div className="items-center text-2xl font-semibold w-64  h-screen">
        <div className="flex pt-4"><BrainIcon /> SecondBrain</div>
        <div className="mt-4 px-8">
            <div onClick={()=>{
                if(props.setytvideos)
                props.setytvideos(false)
                if(props.setTweets)
                props.setTweets(true)
            }}>
                <SideBarItem name="Tweets" icon={<TwiterIcon />} />
            </div>
            <div onClick={()=>{
                if(props.setTweets)
                props.setTweets(false)
                if(props.setytvideos)
                props.setytvideos(true)
            }}>
                <SideBarItem name="Videos" icon={<VideosIcon />} />
            </div>
        </div>
        </div>
    </div>
}