import React from 'react'
import Music from '../Music'

const InitialContent = () => {
    return (
        <div className="initial-content">
            <h2 className="initial-content-title">Showing last updated musics</h2>
            <div className="initial-content-musics">
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
            </div>
        </div>
    )
}

export default InitialContent