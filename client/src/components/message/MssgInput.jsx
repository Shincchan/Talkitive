import React from 'react'
import { BiSend } from 'react-icons/bi'
import useSendMessage from '../../hooks/useSendMessage';
import toast from "react-hot-toast"
import { useState } from 'react';
function MssgInput() {
  const [messaging, setMessage] = useState("")
  const {loading,sendMessage} = useSendMessage();

  async function handleSubmit (e){
      if(messaging===""){
        toast.error("Enter the message");
        return;
      }
      await sendMessage(messaging);
      setMessage("");
      return;
  }
  
  return (
    <form className='px -1' >
        <div className='w-full relative'>
            <input  value={messaging} onChange={(e)=>{
              setMessage(e.target.value);
            }} type='text' className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' placeholder='Send a Message'/>
            {
              
              !loading ? ( <button onClick={handleSubmit} type='button' className='absolute inset-y-0 end-0 flex items-center pe-3' >
              <BiSend/>
            </button>) : 
                (<span className="loading loading-spinner text-warning"></span>)
        
            }


       
        </div>
    </form>
  )
}

export default MssgInput