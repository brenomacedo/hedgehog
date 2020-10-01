import React, { FormEvent, useContext, useRef, useState } from 'react'
import UserContext from '../../Contexts/UserContext'
import { FiX } from 'react-icons/fi'
import './styles.css'
import api from '../../api/api'
const { ipcRenderer } = window.require('electron')

const CreateMusic = () => {

    const User = useContext(UserContext)

    const [musicPic, setMusicPic] = useState<File>()
    const [music, setMusic] = useState<File>()

    const authorRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    const handleCreateMusicClose = () => {
        ipcRenderer.send('createMusicClose')
    }
    
    const changedMusicFile = (e: FormEvent<HTMLInputElement>) => {
        e.currentTarget.files && e.currentTarget.files[0] && setMusicPic(e.currentTarget.files[0])
    }
    
    const changedMusic = (e: FormEvent<HTMLInputElement>) => {
        e.currentTarget.files && e.currentTarget.files[0] && setMusic(e.currentTarget.files[0])
    }
    
    const handleUpload = async () => {

        if(!music) {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Select your music file!' })
        }

        if(music.type !== 'audio/mpeg') {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Music type not allowed!' })
        }

        if(musicPic) {
            const allowedMusicPicType = [
                'image/png',
                'image/jpeg',
                'image/jpg'
            ]

            if(!allowedMusicPicType.includes(musicPic.type)) {
                return ipcRenderer.send('showError', { title: 'Error', msg: 'Music image type not allowed' })
            }
        }

        if(!nameRef.current?.value) {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Write the music name!' })
        }

        if(!authorRef.current?.value) {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Write the music author!' })
        }

        const formData = new FormData()
        formData.append('music', music)
        musicPic && formData.append('image', musicPic)
        formData.append('name', nameRef.current.value)
        formData.append('author', authorRef.current.value)


        try {
            await api.post('/music/create', formData)
            return ipcRenderer.send('createMusicClose')
        } catch {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'File size limit exceeded!' })
        }

    }

    return (
        <div className="create-music-container">
            <div onClick={handleCreateMusicClose} className="create-music-close">
                <FiX size={20} color='white' />
            </div>
            <label htmlFor="musicPicFile" className="create-music-pic">
                Choose music image
            </label>
            <div className="create-music-current-file" >{musicPic?.name}</div>
            <input onChange={changedMusic} hidden type="file" id="musicFile"/>
            <input onChange={changedMusicFile} hidden type="file" id="musicPicFile"/>
            <label htmlFor="musicFile" className="create-music-upload">
                <h4>Choose music file</h4>
            </label>
            <div className="create-music-current-file" >{music?.name}</div>
            <input ref={authorRef} placeholder="Music author" type="text" className="create-music-input"/>
            <input ref={nameRef} placeholder="Music name" type="text" className="create-music-input"/>
            <button onClick={handleUpload} className="create-music-submit">Upload Music</button>
        </div>
    )
}

export default CreateMusic