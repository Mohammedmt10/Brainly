import PlusIcon from "../Icons/PlusIcon"
import Button from "./ui/Buttons"
import { ShareIcon } from "../Icons/ShareIcon"
import CardElement from "./Card"
import { AddContentInterface } from "../utils"
import { useContent  } from "../Hooks/useContent"
import { useEffect } from "react"

export function Header(props : AddContentInterface) {

  const {contents , refresh} = useContent();

  useEffect(() => {
    refresh();
  },[]);
  
    return <div className="bg-[#f2f5f6] border-2 border-[#c0c3c5] pt-9 pl-10 w-screen">
  
      <div className='flex text-3xl  font-bold justify-between pr-8'>
      <div>
        All Notes
      </div>
      <div className="flex h-10 gap-3">
        <div className="h-8">
        <Button startIcon={<ShareIcon />} text="Share" variant="secondary" size="md" />
        </div>
        <div className="h-8" onClick={() => {
          props.setOpen(true)
        }}>
        <Button startIcon={<PlusIcon />} text="Add Content" variant="primary" size="md" />
        </div>
      </div>
      </div>
      <div className="mt-10 gap-4 flex flex-wrap">
        {contents.map(({type , title , link , _id}) => <CardElement 
        _id={_id}
        type={type}
        title={title}            
        link={link}
        ytvideos={props.ytvideos}
        tweets={props.tweets}
        />)}
         </div>
 </div>

}

