import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiSkipBack, FiSkipForward, FiPlayCircle, FiMusic, FiPlusCircle, FiSearch, FiLogOut, FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import api from '../../api/api'
import Bar from '../../Components/Bar'
import InitialContent from '../../Components/InitialContent'
import Music from '../../Components/Music'
import Playlist from '../../Components/Playlist'
import PlaylistListItem from '../../Components/PlaylistListItem'
import WindowModal from '../../Components/WindowModal'
import UserContext from '../../Contexts/UserContext'
import UserInfoContext from '../../Contexts/UserInfoContext'
import WindowContext from '../../Contexts/WindowContext'
import './styles.css'
const { ipcRenderer } = window.require('electron')

const InitialScreen = () => {

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

    const [modalOpened, setModalOpened] = useState(false)
    const [offsetX, setOffsetX] = useState(0)
    const [offsetY, setOffsetY] = useState(0)
    const [musicId, setMusicId] = useState(0)

    const [isInitialScreen, setIsInitialScreen] = useState(true)

    const User = useContext(UserContext)
    const UserInfo = useContext(UserInfoContext)

    const searchRef = useRef<HTMLInputElement>(null)
    
    useEffect(() => {
        api.get<IPlaylist[]>(`playlist/user/${User.id}`).then(resp => {
            UserInfo.setPlaylists && UserInfo.setPlaylists(resp.data)
        }).catch(err => {

        })
    }, [UserInfo.playlists])

    const history = useHistory()

    const handleProfile = () => {
        history.push('/profile')
    }

    const openCreateMusic = () => {
        ipcRenderer.send('createMusic')
    }

    const openCreatePlaylist = () => {
        ipcRenderer.send('createPlaylist')
    }

    const logout = () => {
        User.setIsAuth && User.setIsAuth(false)
        ipcRenderer.send('logout')
        history.push('/')
    }

    const handleSearch = async () => {
        const musics = await api.get(`/music/search?search=${searchRef.current?.value}`)

        UserInfo.setMusics && UserInfo.setMusics(musics.data)

    }

    const loadPlaylists = () => {
        return UserInfo.playlists.map(playlist => {
            return (
                <PlaylistListItem id={playlist.id} key={playlist.id} name={playlist.name}
                userId={playlist.userId} setIsInitialScreen={setIsInitialScreen} />
            )
        })
    }

    return (
        <>
        <Bar />
        <div className="initial-container">
            <WindowContext.Provider value={{ modalOpened, offsetX, setModalOpened,
                setOffsetX, musicId, setMusicId, offsetY, setOffsetY }}>
                    <div className="initial-navigation">
                        <div className="initial-playlist-bar">
                            <p className="initial-playlist-bar-my-top">My Playlists</p>
                            <div className="initial-playlist-list">
                                {loadPlaylists()}
                            </div>
                            <p style={{ cursor: 'pointer', borderTop: '1px dashed white' }} onClick={openCreatePlaylist} className="initial-playlist-bar-my">
                                Create a playlist
                            <FiPlusCircle style={{ marginLeft: 10 }} color='white' size={20} /></p>
                            <p style={{ cursor: 'pointer' }} onClick={openCreateMusic} className="initial-playlist-bar-my">
                                Upload an music
                            <FiMusic style={{ marginLeft: 10 }} color='white' size={20} /></p>
                        </div>
                        <div className="initial-main">
                            <form className="initial-search-container">
                                <div className="initial-profile">
                                    <FiLogOut size={20} style={{ marginRight: 20, cursor: 'pointer'}} color='white'
                                    onClick={logout} />
                                    <div onClick={handleProfile} className="initial-profile-pic" style={{
                                        backgroundImage: `url("http://localhost:3333/userimages/${User.avatar}")`
                                    }}></div>
                                    <p onClick={handleProfile} className="initial-profile-name">{User.name}</p>
                                </div>
                                <div>
                                    {isInitialScreen ? (
                                        <>
                                            <input ref={searchRef} placeholder="Search any music" required type="text"
                                            className="initial-search"/>
                                            <button type="button" onClick={handleSearch}
                                            className="initial-search-button"><FiSearch size={10} color='white' /></button>
                                        </>
                                    ) : (
                                        <>
                                            <FiArrowLeft size={25} onClick={() => setIsInitialScreen(true)}
                                            color='white' style={{ cursor: 'pointer' }} />
                                        </>
                                    )}
                                </div>
                            </form>
                            {isInitialScreen ? <InitialContent /> : <Playlist />}
                        </div>
                    </div>
                    {modalOpened ? (
                        <WindowModal />
                    ) : false}
            </WindowContext.Provider>
            <div className="initial-playlist">
                <p className="initial-playlist-playing-now">
                    Linkin Park - Figure 09
                </p>
                <div className="initial-playlist-controls-and-bar">
                    <div className="initial-playlist-controls">
                        <FiSkipBack className="initial-playlist-icon" size={20} color='white' />
                        <FiPlayCircle className="initial-playlist-icon" size={25} color='white' />
                        <FiSkipForward className="initial-playlist-icon" size={20} color='white' />
                    </div>
                    <div className="initial-playlist-progress-bar">
                        <p className="initial-playlist-progress-bar-info">1:50</p>
                        <div className="initial-playlist-progress-bar-bar">
                            <div className="initial-playlist-brogress-bar-ball"></div>
                        </div>
                        <p className="initial-playlist-progress-bar-info">3:52</p>
                    </div>
                </div>
                <div className="initial-playlist-volume">
                    <div className="initial-playlist-volume-ball"></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default InitialScreen