import React from 'react'
import { useUserContext } from '../../context/userContext'
import { useConvoContext } from '../../context/convo';

function Message({message}) {

  const {user} = useUserContext();
  const {receiver,messages} = useConvoContext();
  const fromMe = message.senderId === user._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? user.profilePic : receiver?.profilePic;
  const colorBG = fromMe ? 'bg-blue-500' : '';
  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic}></img>
            </div>
        </div>
        <div  className={`chat-bubble tex-white  ${colorBG}`}>
           <p >{message.content}</p>
        </div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    </div>
  )
}

export default Message