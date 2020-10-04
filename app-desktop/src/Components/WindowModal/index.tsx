import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import UserInfoContext from '../../Contexts/UserInfoContext'
import WindowContext from '../../Contexts/WindowContext'
import './styles.css'
const { ipcRenderer } = window.require('electron')

const WindowModal = () => {

    const modalRef = useRef<HTMLDivElement>(null)
    const boxRef = useRef<HTMLDivElement>(null)
    const addPlaylistBoxRef = useRef<HTMLDivElement>(null)
    const playnowRef = useRef<HTMLDivElement>(null)

    const Window = useContext(WindowContext)
    const UserInfo = useContext(UserInfoContext)

    useEffect(() => {
        if(Window.musicId !== 0) {
            addPlaylistBoxRef.current?.addEventListener('click', e => {
                ipcRenderer.send('createAddToPlaylist', Window.musicId)
                Window.setModalOpened && Window.setModalOpened(false)
            })

            playnowRef.current?.addEventListener('click', e => {
                UserInfo.setPlayingNow && UserInfo.setPlayingNow(Window.musicUrl)
                UserInfo.setPlayingNowName && UserInfo.setPlayingNowName(Window.musicName)
                UserInfo.setPlayingNowId && UserInfo.setPlayingNowId(Window.musicId)

                Window.setModalOpened && Window.setModalOpened(false)
            })
        }
        
    }, [Window.musicId])

    useEffect(() => {

        const heightReach = boxRef.current && boxRef.current?.offsetTop + boxRef.current?.offsetHeight
        const windowHeight = window.innerHeight
        if(heightReach && heightReach > windowHeight) {
            boxRef.current?.offsetHeight && Window.setOffsetY && Window.setOffsetY(Window.offsetY - 100)
        }

        const widthReach = boxRef.current && boxRef.current?.offsetLeft + boxRef.current?.offsetWidth
        const windowWidth = window.innerWidth
        if(widthReach && widthReach > windowWidth) {
            boxRef.current?.offsetWidth && Window.setOffsetX && Window.setOffsetX(Window.offsetX - 200)
        }

        boxRef.current?.addEventListener('click', e => {
            e.stopPropagation()
        })

        modalRef.current?.addEventListener('click', e => {
            Window.setModalOpened && Window.setModalOpened(false)
        })

    }, [boxRef.current, modalRef.current, window.innerHeight, Window])

    return (
        <div ref={modalRef} className="windowModal">
            <div ref={boxRef} className="windowBox" style={{
                top: Window.offsetY,
                left: Window.offsetX
            }}>
                <div ref={playnowRef} className="windowBox-option">
                    <p>Tocar agora</p>
                </div>
                <div className="windowBox-option" ref={addPlaylistBoxRef}>
                    <p>Adicionar à playlist</p>
                </div>
                <div className="windowBox-option">
                    <p>Denunciar</p>
                </div>
            </div>
        </div>
    )
}

export default WindowModal