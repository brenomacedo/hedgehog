import React, { useState } from 'react'
import Bar from './Components/Bar'
import Routes from './routes'
import UserContext from './Contexts/UserContext'
import './App.css'
import UserInfoContext from './Contexts/UserInfoContext'

function App() {

  interface IPlaylist {
    id: number
    name: string
    userId: number
  }

  interface IMusic {
    id: number
    name: string
    author: string
    avatar: string
    url: string
  }

  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [token, setToken] = useState('')
  const [isAuth, setIsAuth] = useState(false)

  const [musics, setMusics] = useState<IMusic[]>([])
  const [playlists, setPlaylists] = useState<IPlaylist[]>([])
  const [selectedPlaylistMusics, setSelectedPlaylistMusics] = useState<IMusic[]>([])

  return (
    <UserContext.Provider value={{
      id, setId, name, setName, email, setEmail, avatar, setAvatar, token, setToken, isAuth, setIsAuth
    }}>
    <UserInfoContext.Provider value={{ musics, setMusics, playlists, setPlaylists,
      selectedPlaylistMusics, setSelectedPlaylistMusics }}>
    <div className="App">
        <Routes />
      </div>
    </UserInfoContext.Provider>
    </UserContext.Provider>
  )
}

export default App
