import './App.css';
import { useEffect, useState } from 'react';
import GA from './api/GoogleAnalytics';

export const UserContext = React.createContext({})

function App() {
  const [user, setUser] = useState({})

  useEffect(()=>{
  }, [])

  return (
    <UserContext.Provider value={{user: user}} >
        { GA.init() && <GA.RouteTracker /> }
        <Main />
    </UserContext.Provider>
  )
}

export default App;
