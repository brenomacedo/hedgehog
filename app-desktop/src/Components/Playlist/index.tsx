import React from 'react'
import { FiPlay } from 'react-icons/fi'
import './styles.css'

const Playlist = () => {
    return (
        <div className="playlist-container">
            <div className="playlist-item">
                <p className="playlist-music-name">Numb -</p>
                <p className="playlist-music-author">Linkin Park</p>
                <p className="playlist-music-duration">3:52</p>
                <p className="playlist-music-playing-now">Playing Now!</p>
                <FiPlay className="playlist-music-play" size={20} color='white' />
            </div>
        </div>
    )
}

export default Playlist