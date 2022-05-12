import './App.css';
import { useEffect, useState } from 'react';
import GA from './api/GoogleAnalytics';
import { logout } from './api/auth';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext({})

function App() {
  const [user, setUser] = useState({})
  const updateUser = (user)=>{
    setUser(user)
  }

  let navigate = useNavigate()
  const logoutUser = () =>{
    logout(user, (response)=>{
      if (response.status === 200){
        setUser({})
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
