import React from 'react'
import {SearchInput} from './SearchInput'
import Conversations from '../conversations/Conversations.jsx'
import Logout from './Logout.jsx'
export const Sidebar = () => {
  return (
  
   <div className='border-r border-slate-500 p-4 flex flex-col '>
        <SearchInput/>
        <div className='divider px-1'></div>
        <Conversations/>
        <Logout/>
    </div>
   
    
    
    
  )
}
