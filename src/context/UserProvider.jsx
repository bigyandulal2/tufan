import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import userContext from './userContext'
function UserProvider({ children }) {
  const [user, setUser] = useState({
    data: null,
    login: null,
  });

  useEffect(() => {
    const data = getCurrentUserDetail();
    const loggedIn = isLoggedIn();

    setUser({
      data: data || null,
      login: loggedIn,
      
    });
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}


export default UserProvider