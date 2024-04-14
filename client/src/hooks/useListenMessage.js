import React from 'react'
import {useSocketContext} from '../context/socketContext';
import { useConvoContext } from '../context/convo';
import { useEffect } from 'react';

import notification from '../assets/sounds/notify.mp3'
const useListenMessage = () => {
  const { socket }  = useSocketContext();
  const {messages,setMessages} = useConvoContext();

    useEffect(() => {
      socket?.on("newMessage",(newMessage)=>{

        const sound = new Audio(notification);
        sound.play();
        setMessages([...messages,newMessage]);
      })
    
      return () => socket.off("newMessage");
    }, [socket,messages]);
    

}

export default useListenMessage