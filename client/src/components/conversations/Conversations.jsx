import React, { useState } from 'react'
import Conversation from './Conversation'
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import useGetMessages from '../../hooks/useGetMessages';
import useGetonversations from '../../hooks/useGetConversations';
const Conversations = () => {

  const {allUsers,loading} = useGetonversations();
  
  return (
      <div className='py-2 flex flex-col overflow-auto'>
       
       {

        allUsers.map((convo,idx)=>(
          <Conversation 
                      key = {convo._id}
                      
                      conversation = {convo}
                      last_index = {idx === allUsers.length-1}
          />
        ))
       }
       
       {
          
          !loading ? null: 
          (<span className="loading loading-spinner text-warning"></span>)
        
       }
        
        </div>

   
  )
}

export default Conversations