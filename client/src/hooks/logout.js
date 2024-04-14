import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import {useUserContext} from '../context/userContext'
import { useNavigate } from 'react-router-dom';
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const {user,setUser} = useUserContext();
  const navigate = useNavigate();
    const logout = ()=>{
        setLoading(true);
        try {
            
            localStorage.clear();
            setUser(null);
            setLoading(false);
            toast.success("logged Out");
            navigate("/login");
              
        } catch (error) {
            setLoading(false);
            // console.log(error);
            toast.error('Internal Server Error');


        }
    }
    return {loading,logout};
}

export default useLogout;