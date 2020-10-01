import React, { useRef } from 'react'
import { FiX } from 'react-icons/fi'
const { ipcRenderer } = window.require('electron')

const CreatePlaylist = () => {

    const handleCreatePlaylistClose = () => {
        ipcRenderer.send('createPlaylistClose')
    }

    const nameRef = useRef<HTMLInputElement>(null)

    const handleUpload = () => {
        
    }

    return (
        <div className="create-music-container">
            <div onClick={handleCreatePlaylistClose} className="create-music-close">
                <FiX size={20} color='white' />
            </div>
            <input ref={nameRef} placeholder="Music name" type="text" className="create-music-input"/>
            <button onClick={handleUpload} className="create-music-submit">Upload Music</button>
        </div>
    )
}

export default CreatePlaylist