import { ReactElement } from "react";

interface SideBarItemInterface{
    name : string,
    icon : ReactElement
    onClick? : () =>{}
}

export default function SideBarItem(props : SideBarItemInterface) {
    return <button className="flex gap-4 items-center font-normal text-xl py-3" onClick={props.onClick}>
       {props.icon} {props.name}
    </button>
}