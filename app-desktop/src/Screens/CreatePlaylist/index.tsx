import userEvent from '@testing-library/user-event'
import React, { useContext, useRef } from 'react'
import { FiX } from 'react-icons/fi'
import api from '../../api/api'
import UserContext from '../../Contexts/UserContext'
import UserInfoContext from '../../Contexts/UserInfoContext'
const { ipcRenderer } = window.require('electron')

const CreatePlaylist = () => {

    interface ICreatePlaylist {
        id: number
        name: string
        userId: number
    }

    const User = useContext(UserContext)
    const UserInfo = useContext(UserInfoContext)

    const nameRef = useRef<HTMLInputElement>(null)
    
    const handleCreatePlaylistClose = () => {
        ipcRenderer.send('createPlaylistClose')
    }

    const handleUpload = async () => {
        if(!nameRef.current?.value) {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Type your playlist name!' })
        }

        try {
            const playlist = await api.post<ICreatePlaylist>('/playlist/create', {
                name: nameRef.current.value,
                userId: User.id
            })
            ipcRenderer.send('newPlaylistAdded', playlist.data)
            ipcRenderer.send('createPlaylistClose')
        } catch {
            ipcRenderer.send('showError', { title: 'Error', msg: 'An error ocurred, try again later' })
        }
    }

    return (
        <div className="create-music-container">
            <div onClick={handleCreatePlaylistClose} className="create-music-close">
                <FiX size={20} color='white' />
            </div>
            <input ref={nameRef} placeholder="Playlist Name" type="text" className="create-music-input"/>
            <button onClick={handleUpload} className="create-music-submit">Create Playlist</button>
        </div>
    )
}

export default CreatePlaylist