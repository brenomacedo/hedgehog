import React, { useContext } from 'react'
import UserInfoContext from '../../Contexts/UserInfoContext'
import './styles.css'

const AddToPlaylist = () => {

    const UserInfo = useContext(UserInfoContext)


    const addToPlaylist = (playlistId: number) => {

    }

    const loadPlaylists = () => {
        return UserInfo.playlists.map(playlist => {
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