import React, { useEffect } from 'react'
import { useConvoContext } from '../../context/convo'
import { useSocketContext } from '../../context/socketContext';

const Conversation = ({conversation,last_index}) => {
    
        const {receiver,setReceiver} = useConvoContext();
        
        const isSelected = (receiver && receiver._id === conversation._id) ? 1 : 0;

        const {onlineUsers} = useSocketContext();
        const isOnline = onlineUsers.includes(conversation._id);
        
  return (
    <>
        <div className={`flex gap-2 item-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected === 1 ? "bg-sky-500" : ""}`} onClick={()=>{
            setReceiver(conversation);
        }}>
            <div className= {`avatar ${isOnline ? 'online' : ''}  `} >
                <div className='w-12 rounded-full'>
                    <img src= {conversation.profilePic} alt="user pic"  />
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-black-200'>{conversation.username}</p>
                    
                </div>

            </div>
        </div>
        <div>
        {
            !last_index && <div className='divider my-0 py-0 h-1'></div>
        }
        </div>
        
        
    </>
  )
}

export default Conversation