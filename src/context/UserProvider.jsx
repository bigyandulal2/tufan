import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import userContext from './userContext'
function UserProvider({ children }) {

  const [user, setUser] = useState({
    data: {},
    login: false,
    loading: true,
  })

  useEffect(() => {
    setUser({
      data: getCurrentUserDetail(),
      login: isLoggedIn(),
      loading: false, // done loading
    })
  }, [])



  return (

    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>

  )
}

export default UserProvider