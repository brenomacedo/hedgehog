import React from 'react'
import Music from '../Music'

const InitialContent = () => {
    return (
        <div className="initial-content">
            <h2 className="initial-content-title">Showing last updated musics</h2>
            <div className="initial-content-musics">
                <Music id={1} />
                <Music id={2} />
                <Music id={3} />
                <Music id={4} />
                
            </div>
        </div>
    )
}

export default InitialContent