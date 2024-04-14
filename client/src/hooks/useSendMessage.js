import React from 'react'
import { useConvoContext } from '../context/convo'
import toast from "react-hot-toast"
import { useState } from 'react';
import axios from "axios";
const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const  {receiver,messages,setMessages}= useConvoContext();
        const sendMessage = async (message)=>{
            try {
                setLoading(true);

                axios({
                    // Endpoint to send files
                    url: `http://localhost:8000/message/send/${receiver._id}`,
                    method: "POST",
                    headers:  { 
                        "Content-Type":"application/json",
                        "Authorization" : "Bearer "  + localStorage.getItem('token'),
                    },
         
                    data : JSON.stringify({message})
                }).then(res=>

                    {
                    setMessages([...messages,res.data.message])
                        
                } 
                    
                )
               
            
        } catch (error) {
            toast.error(error);
        }finally{
            setLoading(false);
        }
        }
            
        console.log(messages);
    return {loading,sendMessage};

}

export default useSendMessage