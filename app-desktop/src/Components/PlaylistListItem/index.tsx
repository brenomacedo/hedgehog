import React, { Dispatch, FC, SetStateAction, useContext } from 'react'
import api from '../../api/api'
import UserInfoContext from '../../Contexts/UserInfoContext'
import { FiTrash } from 'react-icons/fi'
import './styles.css'
const { ipcRenderer } = window.require('electron')

interface PlaylistListItemProps {
    id: number
    userId: number
    name: string
    setIsInitialScreen: Dispatch<SetStateAction<boolean>>
}

const PlaylistListItem: FC<PlaylistListItemProps> = ({ id, name, userId, setIsInitialScreen }) => {

    interface PlaylistToMusic {
        Music: {
            id: number
            name: string
            author: string
            avatar: string
            url: string
        }
    }

    interface GetMusicByPlaylist {
        id: number
        name: string
        userId: number
        PlaylistToMusic: PlaylistToMusic[]
    }

    const UserInfo = useContext(UserInfoContext)

    const handlePlaylist = async () => {
        try {
            const musics = await api.get<GetMusicByPlaylist>(`/music/playlist/${id}`)
            const playlistMusics = musics.data.PlaylistToMusic.map(item => {
                return {...item.Music}
            })
            
            UserInfo.setSelectedPlaylistMusics && UserInfo.setSelectedPlaylistMusics(playlistMusics)
            setIsInitialScreen(false)
        } catch {

        }
    }

    const deletePlaylist = async (playlistId: number) => {
        try {
            await api.delete(`/playlist/delete/${playlistId}`)
        } catch {
            ipcRenderer.send('showMessage', { title: 'Error', msg: 'Error ocurrent while deleting your message' })
        }
    }

    return (
        <div className="initial-playlist-list-item">
            <div onClick={handlePlaylist} className="initial-playlist-list-item-name">
                {name}
            </div>
            <div onClick={() => deletePlaylist(id)} className="delete-playlist">
                <FiTrash size={20} color='white' />
            </div>
        </div>
    )
}

export default PlaylistListItem