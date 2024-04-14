import React, { useState } from 'react'
import '../static/signup.css';
import {Link} from "react-router-dom";

import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [inputs,setInputs] = useState({
    username:'',
    password : '',
    gender : '',
  });
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const  signup = async (inputs)=>{
    try {
    const {username,password,gender} = inputs;
    const inputsCheck = await isOK(inputs);
    if(!inputsCheck){ setloading(false); return;}
    if(inputsCheck){
        
            fetch("http://localhost:8000/signup",{
                method : "post",
                headers :  { "Content-Type":"application/json"},
                body : JSON.stringify({username,password,gender,}), 
            }).then(res =>
                res.json()
              ).then(data =>{
              console.log(data);
                  if(data.error){
                    toast.error(data.error);
                  }else{
                    setloading(false);
                    toast.success('Account has been created');
                    navigate("/login");
                  }
            })
            
        }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error('Server error');
  }
    
}


async function isOK({username,password,gender}){
    if(!username || !password || !gender){
        toast.error('Please fill all the details');
        return false;
    }
    if(password.length < 6){
        toast.error('password must have atleast six characters');
        return false;
    }
    return true;
}





  async function handleSubmit(e){
    try {
      setloading(true);
      await signup(inputs);
      
    } catch (error) {
      setloading(false);
      console.log(error);
    }
    return;
  }

  return (
    <>
        <div className='background' >
        <div className = 'container1'>
          <h1 className='madimi-one-regular' style={{fontSize:'2.5rem'}}>Talkitive</h1>
          <h3 style={{fontWeight :'bold'}}>Create Account</h3>

          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Username" value={inputs.username} 
            onChange={(e) =>{setInputs({...inputs,username : e.target.value})}}/>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="password" className="grow" placeholder="Password" value={inputs.password} 
            onChange={(e) =>{setInputs({...inputs,password : e.target.value})}}/>
          </label>
          <select onChange={(e)=>{
            setInputs({...inputs,gender : e.target.value})
          }} className="select select-bordered   grow-v" onSelect={(e)=>{setInputs({...inputs,gender:e.selected})}}>
            <option disabled selected>Gender?</option>
            <option value='MALE' >MALE</option>  
            <option value='FEMALE'> FEMALE</option>
          </select>
         {
          
            !loading ? (<button style={{borderRadius : '4px'}} className="btn btn-sm btn-outline " onClick={handleSubmit}>Signup</button>) : 
            (<span className="loading loading-spinner text-warning"></span>)
          
         }
          
          <h3 style={{fontWeight :'bold'}}>Already have an account ? <Link to = '/login' style={{color : 'blue'}}>Login</Link></h3>
        </div>  
      </div> 
    </>
  ) 
}

export default Signup