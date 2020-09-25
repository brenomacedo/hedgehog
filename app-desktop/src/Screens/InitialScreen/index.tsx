import React from 'react'
import { FiSkipBack, FiSkipForward, FiPause, FiPlayCircle, FiPauseCircle } from 'react-icons/fi'
import './styles.css'

const InitialScreen = () => {
    return (
        <div className="initial-container">
            <div className="initial-navigation">
                
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