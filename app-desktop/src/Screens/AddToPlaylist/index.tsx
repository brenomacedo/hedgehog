import React, { useContext, useEffect, useState } from 'react'
import api from '../../api/api'
import UserContext from '../../Contexts/UserContext'
import UserInfoContext from '../../Contexts/UserInfoContext'
import './styles.css'

const AddToPlaylist = () => {

    interface IPlaylist {
        id: number
        userId: number
        name: string
    }

    const User = useContext(UserContext)

    const [userPlaylists, setUserPlaylists] = useState<IPlaylist[]>([])

    useEffect(() => {
        api.get<IPlaylist[]>(`/playlist/user/${User.id}`).then(res => {
            setUserPlaylists(res.data)
        }).catch(err => {

        })
    }, [User.id])

    const addToPlaylist = (playlistId: number) => {

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

    return (
        <div className="add-to-container">
            <h3>Add To Playlist</h3>
            <div className="add-to-playlists">
                {loadPlaylists()}
            </div>
        </div>
    )
}

export default AddToPlaylist