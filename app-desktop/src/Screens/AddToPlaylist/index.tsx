import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FiX } from 'react-icons/fi'
import api from '../../api/api'
import UserContext from '../../Contexts/UserContext'
import './styles.css'
const { ipcRenderer } = window.require('electron')

const AddToPlaylist = () => {

    interface IPlaylist {
        id: number
        userId: number
        name: string
    }

    const User = useContext(UserContext)

    const [userPlaylists, setUserPlaylists] = useState<IPlaylist[]>([])

    const musicId = useMemo(() => Number(window.process.argv[window.process.argv.length - 1]), [])

    useEffect(() => {
        api.get<IPlaylist[]>(`/playlist/user/${User.id}`).then(res => {
            setUserPlaylists(res.data)
        }).catch(err => {

        })
    }, [User.id])

    const addToPlaylist = async (playlistId: number) => {
        try {
            await api.post('/playlist/music', {
                musicId,
                playlistId
            })

            ipcRenderer.send('addToPlaylistClose')
        } catch {
            ipcRenderer.send('showError', { title: 'Error', msg: 'An error ocurred' })
            ipcRenderer.send('addToPlaylistClose')
        }
    }

    const loadPlaylists = () => {
        return userPlaylists.map(playlist => {
            return (
                <div onClick={() => addToPlaylist(playlist.id)} className="add-to-playlist">
                    {playlist.name}
                </div>
            )
        })
    }

    const close = () => {
        ipcRenderer.send('addToPlaylistClose')
    }

    return (
        <div className="add-to-container">
            <div className="add-to-close" onClick={close}>
                <FiX size={25} color='white' />
            </div>
            <h3>Add To Playlist</h3>
            <div className="add-to-playlists">
                {loadPlaylists()}
            </div>
        </div>
    )
}

export default AddToPlaylist