import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useConvoContext } from '../../context/convo';
import useGetonversations from '../../hooks/useGetConversations';
import toast from "react-hot-toast"

export const SearchInput = () => {

    const [search, setSearch] = useState("");
    const  {setReceiver} =  useConvoContext();
    const {allUsers } = useGetonversations();
 
  const handleSubmit = (e)=>{
    if(!search) return;
    if(search.length < 3){
      return toast.error("search item must have atleast three characters");
    }
    
    const conversation =  allUsers.find((c)=>
      c.username.toLowerCase().includes(search.toLowerCase( )) ) 
    
    if(conversation){
      setReceiver(conversation);
      setSearch("");

    }else{
      console.log(conversation);
      toast.error("No User Found");
    }

  }

  return (
    <form className='flex items-center gap-2'>
        <input onChange={(e)=>{
          setSearch(e.target.value);
        }} type='text' placeholder='search..' className='input input-bordered rounded-full' />
        <button type='button' onClick={handleSubmit} className='btn btn-circle bg-sky-500 text-white'>
            <FaSearch/>
        </button>
    </form>
  )
}
