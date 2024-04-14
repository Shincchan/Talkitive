import React, { useEffect } from 'react'
import Messages from './Messages'
import MssgInput from './MssgInput'
import {TiMessages} from  'react-icons/ti' 
import { useConvoContext } from '../../context/convo'
import { useUserContext } from '../../context/userContext'
function MssgContainer() {
  const {receiver,setReceiver} = useConvoContext();

  useEffect(() => {
  
    return () => 
      setReceiver(null);
    
  }, []);
  

  return (
    <div style = {{width : '35vw'}} className=' flex flex-col justify-between'>
        {!receiver ? (<NoChatSelected/>) :
        
        ( <>
            <div className='bg-slate-500 px-4 py-2 mb-2'> 
            <span className='label-text'>To:</span>
            <span className='text-grey-900 font-bold' >{receiver.username}</span>
            </div>
            <Messages/>
            <MssgInput/>
            
        </>)}
        
        
    </div>
  );
}


const NoChatSelected = ()=>{
  const {user} = useUserContext();

  return (
    <>
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col  items-center gap-2'>
      <p>Welcome {user?.username} to chatAPP select person to chat</p>
      <TiMessages className='text 3xl md:text-6xl text-center '/>

      </div>

    </div>
    </>
    
  )
}

export default MssgContainer;

