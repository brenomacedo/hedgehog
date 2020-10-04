import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiPause, FiPauseCircle, FiPlayCircle } from 'react-icons/fi'
import UserInfoContext from '../../Contexts/UserInfoContext'

const InitialPlaylist = () => {

    const UserInfo = useContext(UserInfoContext)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState('0:00')
    const [duration, setDuration] = useState('')
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(1)

    const audioRef = useRef<HTMLAudioElement>(null)
    const volumeBarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        volumeBarRef.current?.addEventListener('click', e => {
            volumeBarRef.current && setVolume((e.pageX - volumeBarRef.current?.offsetLeft) / volumeBarRef.current.offsetWidth)
            if(volumeBarRef.current && audioRef.current?.volume) {
                audioRef.current.volume = (e.pageX - volumeBarRef.current?.offsetLeft) / volumeBarRef.current.offsetWidth
            }
        })

        audioRef.current?.addEventListener('timeupdate', e => {
            const currentTime = audioRef.current?.currentTime
            const duration = audioRef.current?.duration
            if(duration && currentTime) {
                let durationMinutes = Math.floor(duration/60)
                let durationSeconds = `${Math.floor(duration - durationMinutes*60)}`

                if(durationSeconds.length <= 1) {
                    durationSeconds = `0${durationSeconds}`
                }

                let durationFormat = `${Math.floor(durationMinutes)}:${durationSeconds}`
        

                let currentTimeMinutes = Math.floor(currentTime / 60)
                let currentTimeSeconds = `${Math.floor(currentTime - currentTimeMinutes*60)}`

                if(currentTimeSeconds.length <= 1) {
                    currentTimeSeconds = `0${currentTimeSeconds}`
                }

                let currentTimeFormat = `${Math.floor(currentTimeMinutes)}:${currentTimeSeconds}`

                setCurrentTime(currentTimeFormat)
                setDuration(durationFormat)
                setProgress(currentTime / duration)
            }
        })
    }, [])

    const playOrPause = () => {
        if(isPlaying) {
            setIsPlaying(false)
            audioRef.current?.pause()
        } else {
            setIsPlaying(true)
            audioRef.current?.play()
        }
    }

    return (
        <div className="initial-playlist">
            <p className="initial-playlist-playing-now">
                {UserInfo.playingNowName}
            </p>
            <div className="initial-playlist-controls-and-bar">
                <div className="initial-playlist-controls">
                    
                    <div onClick={playOrPause} className="initial-playlist-control">
                        {isPlaying ? <FiPauseCircle className="initial-playlist-icon" size={25} color='white' /> : <FiPlayCircle size={25} color='white' />}
                    </div>
    
                </div>
                <div className="initial-playlist-progress-bar">
                    <p className="initial-playlist-progress-bar-info">{currentTime}</p>
                    <div className="initial-playlist-progress-bar-bar">
                        <div style={{ left: 100*progress }} className="initial-playlist-brogress-bar-ball"></div>
                    </div>
                    <p className="initial-playlist-progress-bar-info">{duration}</p>
                </div>
            </div>
            <div ref={volumeBarRef} className="initial-playlist-volume">
                <div style={{ left: 100*volume }} className="initial-playlist-volume-ball"></div>
            </div>
            <audio src={`http://localhost:3333/music/${UserInfo.playingNow}`} ref={audioRef}>
                <source src={UserInfo.playingNow}></source>
            </audio>
        </div>
    )
}

export default InitialPlaylist