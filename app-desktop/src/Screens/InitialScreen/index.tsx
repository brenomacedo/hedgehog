import React from 'react'
import { FiSkipBack, FiSkipForward, FiPlayCircle, FiPauseCircle, FiPlusCircle, FiSearch } from 'react-icons/fi'
import Music from '../../Components/Music'
import './styles.css'

const InitialScreen = () => {
    return (
        <div className="initial-container">
            <div className="initial-navigation">
                <div className="initial-playlist-bar">
                    <p className="initial-playlist-bar-my">My Playlists</p>
                    <div className="initial-playlist-list">

                    </div>
                    <p style={{ cursor: 'pointer' }} className="initial-playlist-bar-my">
                        Create a playlist
                    <FiPlusCircle style={{ marginLeft: 10 }} color='white' size={20} /></p>
                </div>
                <div className="initial-main">
                    <form className="initial-search-container">
                        <input placeholder="Search any music" required type="text" className="initial-search"/>
                        <button className="initial-search-button"><FiSearch size={10} color='white' /></button>
                    </form>
                    <div className="initial-content">
                        <h2 className="initial-content-title">Showing last updated musics</h2>
                        <div className="initial-content-musics">
                            <Music />
                            <Music />
                            <Music />
                            <Music />
                            <Music />
                            <Music />
                            <Music />
                            <Music />
                        </div>
                    </div>
                </div>
            </div>
            <div className="initial-playlist">
                <p className="initial-playlist-playing-now">
                    Linkin Park - Figure 09
                </p>
                <div className="initial-playlist-controls">
                    <FiSkipBack className="initial-playlist-icon" size={20} color='white' />
                    <FiPlayCircle className="initial-playlist-icon" size={25} color='white' />
                    <FiSkipForward className="initial-playlist-icon" size={20} color='white' />
                </div>
                <div className="initial-playlist-volume">
                    <div className="initial-playlist-volume-ball"></div>
                </div>
            </div>
        </div>
    )
}

export default InitialScreen