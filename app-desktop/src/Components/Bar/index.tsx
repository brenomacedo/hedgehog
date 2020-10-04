import React, { useContext, useState } from 'react'
import { FiX, FiMinus, FiSquare } from 'react-icons/fi'
import UserContext from '../../Contexts/UserContext'
import UserInfoContext from '../../Contexts/UserInfoContext'
import './styles.css'

const { ipcRenderer } = window.require('electron')

const Bar = () => {

    const UserInfo = useContext(UserInfoContext)
    const User = useContext(UserContext)
    
    const [fullScreen, setFullScreen] = useState(false)

    const handleResize = () => {
        ipcRenderer.send('resize', fullScreen)
        setFullScreen(!fullScreen)
    }

    const handleMinimize = () => {
        ipcRenderer.send('min')
    }

    const handleClose = () => {
        ipcRenderer.send('close')
    }

    return (
        <div className="bar-container">
            <h3 className="bar-title">Hedgehog</h3>
            <div className="bar-options">
                <div className="bar-option" onClick={handleMinimize}>
                    <FiMinus size={20} color='white' />
                </div>
                <div className="bar-option" onClick={handleResize}>
                    <FiSquare size={15} color='white' />
                </div>
                <div className="bar-option close" onClick={handleClose}>
                    <FiX size={18} color='white' />
                </div>
            </div>
        </div>
    )
}

export default Bar