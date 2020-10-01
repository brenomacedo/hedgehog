import React, { Dispatch, FC, SetStateAction, useContext } from 'react'
import api from '../../api/api'
import UserInfoContext from '../../Contexts/UserInfoContext'
import './styles.css'

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

    return (
        <div onClick={handlePlaylist} className="initial-playlist-list-item">
            {name}
        </div>
    )
}

export default PlaylistListItem