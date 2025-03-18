import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";


export function useContent() {
    const [contents , setContents] = useState([]);

    function refresh() {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers : {
                "authorization" : localStorage.getItem("token")
            }
        })
        .then((response) =>{
            //@ts-ignore
            setContents(response.data.content)
        })
    }

    useEffect(() => {
        refresh();
        const refreshInterval = setInterval(() => {
            refresh();
        } , 10 *1000)
       return () => clearInterval(refreshInterval)
    } , [])


    return {contents , refresh}
}