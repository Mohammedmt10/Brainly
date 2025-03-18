import { toshow } from "../utils";
import { MainContents } from "./MainPageforlinks";
import SideBar from "./SideBar";

export function SharedPage({ytvideos , tweets , setTweets , setytvideos} : toshow) {
    
    return <div className="flex">
        <SideBar setTweets ={setTweets} setytvideos={setytvideos} />
        <MainContents ytvideos={ytvideos} tweets={tweets} />        
    </div>
}