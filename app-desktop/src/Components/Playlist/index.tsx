import React, { useContext, useEffect } from 'react'
import { FiPlay } from 'react-icons/fi'
import UserInfoContext from '../../Contexts/UserInfoContext'
import './styles.css'

const Playlist = () => {

    const UserInfo = useContext(UserInfoContext)

    const loadPlaylistItems = () => {
        return UserInfo.selectedPlaylistMusics.map(item => {
            return (
                <div className="playlist-item">
                    <p className="playlist-music-name">{item.name} -</p>
                    <p className="playlist-music-author">{item.author}</p>
                    <p className="playlist-music-duration">3:52</p>
                    <p className="playlist-music-playing-now">Playing Now!</p>
                    <FiPlay className="playlist-music-play" size={20} color='white' />
                </div>
            )
        })
    }

    return (
        <div className="playlist-container">
            {loadPlaylistItems()}
        </div>
    )
}

export default Playlist