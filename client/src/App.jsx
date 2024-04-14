import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Home from './pages/home.jsx'
import { Toaster } from 'react-hot-toast';
import { useUserContext } from './context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ConvoContextProvider } from './context/convo.jsx';

const Routing = ()=>{
  const navigate =useNavigate();
  const {user,setUser} = useUserContext();
  useEffect(()=>{
    const User= JSON.parse(localStorage.getItem('user'));
    if(User){
     setUser(User);
   }else{
     navigate('/login');
   }
  },[])
  
  return (
    
    <div className='h-screen flex items-center justify-center'>
      <Routes>
        <Route exact path="/login" element={ <Login />}/>
        <Route exact path="/" element={<ConvoContextProvider><Home /></ConvoContextProvider>}/>  
        <Route exact path="/signup" element={<Signup/>}/>
      </Routes>
      <Toaster/>
    </div>
      
    
  )
}



function App() {

  return (
    <BrowserRouter>
      <Routing/>
    </BrowserRouter>
   
  )
}
export default App
