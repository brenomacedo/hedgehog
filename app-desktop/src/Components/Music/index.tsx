import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'
import WindowContext from '../../Contexts/WindowContext'
import './styles.css'

interface IMusicProps {
    id: number
    name: string
    author: string
    avatar: string
    url: string
}

const Music: FC<IMusicProps> = ({ id, author, avatar, name, url }) => {

    useEffect(() => {
        musicRef.current?.addEventListener('click' , e => {
            
            Window.setModalOpened && Window.setModalOpened(true)
            
            Window.setOffsetX && Window.setOffsetX(e.pageX)
            Window.setOffsetY && Window.setOffsetY(e.pageY)

            
            
            Window.setMusicName && Window.setMusicName(name)
            Window.setMusicUrl && Window.setMusicUrl(url)
            Window.setMusicId && Window.setMusicId(id)
            
        })
    }, [])

    const Window = useContext(WindowContext)
    const musicRef = useRef<HTMLDivElement>(null)

    

    return (
        <div ref={musicRef} className="music-container">
            <div className="music-thumb" style={{
                backgroundImage: `url("http://localhost:3333/musicimages/${avatar}")`
            }}>

            </div>
            <h3 className="music-title">{name}</h3>
            <p className="music-author">{author}</p>
        </div>
    )
}

export default Music