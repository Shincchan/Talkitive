import {createContext, useState } from "react";
import { useContext } from "react";
const convoContext = createContext();

export const useConvoContext = ()=>{
    return useContext(convoContext);
    
}

export const ConvoContextProvider = ({children})=> {
       const [receiver, setReceiver] = useState(null);
       const [messages, setMessages] = useState([]);
return <convoContext.Provider value={{receiver,setReceiver,messages,setMessages}}>
       {children}
       </convoContext.Provider>
}   