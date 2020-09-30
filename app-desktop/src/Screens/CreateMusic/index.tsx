import React, { useContext } from 'react'
import UserContext from '../../Contexts/UserContext'
import './styles.css'

const CreateMusic = () => {

    const User = useContext(UserContext)

    return (
        <div className="create-music-container">
            <label htmlFor="musicPicFile" className="create-music-pic"></label>
            <input hidden type="file" id="musicFile"/>
            <input hidden type="file" id="musicPicFile"/>
            <label htmlFor="musicFile" className="create-music-upload">
                <h4>Choose music file</h4>
            </label>
            <input placeholder="Music author" type="text" className="create-music-input"/>
            <input placeholder="Music name" type="text" className="create-music-input"/>
            <button className="create-music-submit">Upload Music</button>
        </div>
    )
}

export default CreateMusic