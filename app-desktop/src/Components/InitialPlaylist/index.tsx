import React, { useEffect, useRef, useState } from 'react'
import { FiPause, FiPauseCircle, FiPlayCircle } from 'react-icons/fi'

const InitialPlaylist = () => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState('0:00')
    const [duration, setDuration] = useState('')
    const [progress, setProgress] = useState(0)

    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
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
                Linkin Park - Figure 09
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
                        <div className="initial-playlist-brogress-bar-ball"></div>
                    </div>
                    <p className="initial-playlist-progress-bar-info">{duration}</p>
                </div>
            </div>
            <div className="initial-playlist-volume">
                <div className="initial-playlist-volume-ball"></div>
            </div>
            <audio ref={audioRef}>
                <source src="http://localhost:3333/music/2f4d226017cf180bfda720985929df1b-bensound-dubstep.mp3"></source>
            </audio>
        </div>
    )
}

export default InitialPlaylist