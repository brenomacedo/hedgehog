import React, { useContext, useEffect } from 'react'
import api from '../../api/api'
import UserInfoContext from '../../Contexts/UserInfoContext'
import Music from '../Music'

const InitialContent = () => {

    const UserInfo = useContext(UserInfoContext)

    useEffect(() => {
        api.get('/music/all').then(resp => {
            UserInfo.setMusics && UserInfo.setMusics(resp.data)
        }).catch(err => {})
    }, [UserInfo.musics])

    const loadMusics = () => {
        return UserInfo.musics.map(music => {
            return (
                <Music author={music.author} url={music.url} name={music.name}
                id={music.id} avatar={music.avatar} key={music.id} />
            )
        })
    }

    return (
        <div className="initial-content">
            <h2 className="initial-content-title">Showing last updated musics</h2>
            <div className="initial-content-musics">
                {loadMusics()}
            </div>
        </div>
    )
}

export default InitialContent