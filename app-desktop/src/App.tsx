import React, { useState } from 'react'
import Bar from './Components/Bar'
import Routes from './routes'
import UserContext from './Contexts/UserContext'
import './App.css'

function App() {

  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [token, setToken] = useState('')
  const [isAuth, setIsAuth] = useState(false)

  return (
    <UserContext.Provider value={{
      id, setId, name, setName, email, setEmail, avatar, setAvatar, token, setToken, isAuth, setIsAuth
    }}>
      <div className="App">
        <Routes />
      </div>
    </UserContext.Provider>
  )
}

export default App
