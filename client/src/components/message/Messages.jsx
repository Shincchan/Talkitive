import React from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import { useConvoContext } from '../../context/convo';
import { useRef } from 'react';
import { useEffect } from 'react';
import useListenMessage from '../../hooks/useListenMessage';
function Messages() {

  const {loading,messages} = useGetMessages();
  useListenMessage();
  const lastNewMssg = useRef();
  useEffect(() => {
    setTimeout(()=>{
      lastNewMssg.current?.scrollIntoView({behavior:"smooth"});
    },100)
    
  }, [messages])
  
  return (
    <div className='px-4 overflow-auto'>
        
        {
          
          !loading && messages.length > 0 &&   
          messages.map( (content,k) => (
            <div key = {content._id+ `${k}`} ref={lastNewMssg}>
                <Message  message = {content}/>
            </div>
            
          ))
       }
        
        {
          
          loading &&  
          (<span className="loading loading-spinner text-warning"></span>)
        
       }
       {
          
          !loading && messages.length === 0 &&   
          (<p className='text-center'>Please send a message to start the conversation</p>)
        
       }
       
    </div>
  )
}

export default Messages