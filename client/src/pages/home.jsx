import React from 'react'
import { Sidebar } from '../components/sidebar/Sidebar'
import MssgContainer from '../components/message/MssgContainer'

export default function () {
  return (
    <div className = 'background' >
        <div className='flex sm:h-[450px] md:-[550px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0.05 '
         style={{backgroundColor : 'rgba(79,248,56,0.14)'}}>
            <Sidebar/>
            <MssgContainer/>  
        </div>
    </div>
    
    
        
   
  )
}