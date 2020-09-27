import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'
import WindowContext from '../../Contexts/WindowContext'
import './styles.css'

interface IMusicProps {
    id: number
}

const Music: FC<IMusicProps> = ({ id }) => {

    useEffect(() => {
        musicRef.current?.addEventListener('click' , e => {
            
            Window.setModalOpened && Window.setModalOpened(true)
            
            Window.setOffset && Window.setOffset({ x: e.pageX, y: e.pageY })
            
            Window.setMusicId && Window.setMusicId(id)
            
        })
    }, [])

    const Window = useContext(WindowContext)
    const musicRef = useRef<HTMLDivElement>(null)

    const handleClick = () => {
        console.log(Window.musicId)
    }

    return (
        <div ref={musicRef} className="music-container" onClick={handleClick}>
            <div className="music-thumb">

            </div>
            <h3 className="music-title">Numb</h3>
            <p className="music-author">Linkin park</p>
        </div>
    )
}

export default Music