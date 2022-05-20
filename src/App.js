import React from 'react'
import { useEffect, useState } from 'react';
import GA from './api/GoogleAnalytics';
import { logout } from './api/auth';
import { useNavigate } from 'react-router-dom';
import Main from './pages/Main';

export const UserContext = React.createContext({})

function App() {
  const getUser = () => {
    return sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):{}
  }
  const [user, setUser] = useState(getUser())
  const updateUser = (user)=>{
    if(Object.keys(user).length > 0){
      sessionStorage.setItem('user', JSON.stringify(user))
    }else{
      sessionStorage.removeItem('user')
    }
    setUser(user)
  }

  let navigate = useNavigate()
  const logoutUser = () =>{
    logout(user, (response)=>{
      if (response.status === 200){
        updateUser({})
        navigate("/")
      }
    })
  }
  useEffect(()=>{
  }, [])

  return (
    <UserContext.Provider value={{user: user, logoutUser: logoutUser, updateUser: updateUser}} >
        { GA.init() && <GA.RouteTracker /> }
        <Main />
    </UserContext.Provider>
  )
}

export default App;
