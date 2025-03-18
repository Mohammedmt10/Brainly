import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"


export function useShare() {
    
    const [contents , setContents] = useState([])
    

        function refresh() {
        
        const link = window.location.pathname
        axios.get(`${BACKEND_URL}/api/v1${link}`)
        .then((response) => {
            //@ts-ignore
            setContents(response.data?.content)
        });
}

    useEffect(()=>{
        refresh();
    },[])
    
    return  {contents ,refresh}
    
}