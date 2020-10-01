import React, { FC } from 'react'
import './styles.css'

interface PlaylistListItemProps {
    id?: number
    userId?: number
    name?: string
}

const PlaylistListItem: FC<PlaylistListItemProps> = ({ id, name, userId }) => {
    return (
        <div className="initial-playlist-list-item">
            {name}
        </div>
    )
}

export default PlaylistListItem