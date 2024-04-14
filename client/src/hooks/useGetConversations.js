import { useState } from "react";
import toast from "react-hot-toast"
import { useEffect } from "react";
const useGetonversations = () => {
    const [loading, setLoading] = useState(true) ;
    const [allUsers, setAllUsers] = useState([]) ;
    useEffect(() => {
        const getConversations = ()=>{
      try {
       
        fetch('http://localhost:5000/users',{
          method : "GET",
          headers :  { 
            
            "Content-Type":"application/json",
            "Authorization" : "Bearer "  + localStorage.getItem('token'),
            
          }
        },).then(res=>
          res.json()
        ).then(data=>{
          
          if(data.error){
            // toast.error(data.error);
          }else{
            
            setAllUsers(data.users); 
            
          }
          
        })
        
  
      } catch (error) {
        console.log(error);
        toast.error('internal server error');
      //  setLoading(false); 
      }finally{
        setLoading(false);
      }

    }
    getConversations();
    }, [])

    return {allUsers,loading}

}

export default useGetonversations