import { Header } from './Header'
import SideBar from './SideBar'
import { AddContent } from "./AddContent"
import { useState } from "react";
import { toshow } from '../utils';

export function Dashboard({ytvideos , tweets , setTweets , setytvideos} : toshow) {
    const [Open , setOpen] = useState(false);
    return <div className='flex'>
    {Open && <AddContent Open = {Open} setOpen = {setOpen} />}
    <SideBar setTweets={setTweets} setytvideos={setytvideos} />
    <Header Open = {Open} setOpen = {setOpen} ytvideos={ytvideos} tweets={tweets} />
    </div>
}