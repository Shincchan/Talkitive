import React from 'react'
import '../static/signup.css';
import {Link} from "react-router-dom";
import { useState } from 'react';
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../context/userContext';
import axios from "axios";

const Login = () => {
  const [inputs,setInputs] = useState({
    username:'udit',
    password : '123456',
  });
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const {user,setUser} = useUserContext();
  const  login = async (inputs)=>{
    try {
    const {username,password} = inputs;
    const inputsCheck = await isOK(inputs);
    if(!inputsCheck) {
      setloading(false);
      return;
    }
    if(inputsCheck){
        
            axios(
              { url : "/login",
                method : "post",
                headers :  { "Content-Type":"application/json"},
                data : JSON.stringify({username,password}), 
              }
          ).then(res =>{
                  if(res.data.error){
                    toast.error(res.data.error);
                  }else{
                    localStorage.setItem("token",res.data.token);
                    localStorage.setItem("user",JSON.stringify(res.data.user));
                    setUser(res.data.user);
                    toast.success('Login');
                    navigate("/");
                  }
                  console.log(res);
            })
            
        }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error('Server error');
  }
    
}



async function isOK({username,password}){
    if(!username || !password){
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
      await login(inputs);
      setloading(false);
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
          <h3 style={{fontWeight :'bold'}}>Login</h3>

          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Username" value={inputs.username} 
            onChange={(e) =>{setInputs({...inputs,username : e.target.value})}} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="password" className="grow" placeholder="Password" value={inputs.password} 
            onChange={(e) =>{setInputs({...inputs,password : e.target.value})}} />
          </label>
          {
          
          !loading ? (<button style={{borderRadius : '4px'}} className="btn btn-sm btn-outline " onClick={
            handleSubmit
          }>Login</button>) : 
          (<span className="loading loading-spinner text-warning"></span>)
        
       }
          
          <h3 style={{fontWeight :'bold'}}>Dont have an account ? <Link to = '/signup' style={{color : 'blue'}}>Signup</Link></h3>
        </div>  
      </div> 
    </>
  ) 

}

export default Login