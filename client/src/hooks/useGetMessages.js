
import React from 'react'
import { useState } from "react";
import { useConvoContext } from '../context/convo';
import { useEffect } from 'react';
import axios from "axios";

const useGetMessages = () => {
    const [loading, setLoading] = useState(0);
    const {receiver,messages,setMessages} = useConvoContext();

    useEffect(() => {
       
        const getMessages = ()=>{
            try {
                setLoading(true);
                axios({
                    // Endpoint to send files
                    url: `/message/${receiver._id}`,
                    method: "GET",
                    headers:  { 
                        "Content-Type":"application/json",
                        "Authorization" : "Bearer "  + localStorage.getItem('token'),
                    },
                }).then(res=>
                    {
                    setMessages(res.data.messages) }         
                )
               
            
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
        }
        if(receiver?._id) getMessages();
        }
     
    , [receiver?._id]);
    
    
    
    return {loading,messages}
    

    
}

export default useGetMessages
