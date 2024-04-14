import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/userContext.jsx'
import { SocketContextProvider } from './context/socketContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
        <UserContextProvider>
          <SocketContextProvider>
          <App />
          </SocketContextProvider>
        
        </UserContextProvider>
  </React.StrictMode>,
)
