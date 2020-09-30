import Axios from 'axios'
import React, { FormEvent, useContext, useRef } from 'react'
import { FiUser, FiKey, FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import api from '../../api/api'
import UserContext from '../../Contexts/UserContext'
import './styles.css'

const { ipcRenderer } = window.require('electron')

const Profile = () => {

    const history = useHistory()

    const User = useContext(UserContext)

    const goBack = () => {
        history.goBack()
    }

    const nameRef = useRef<HTMLInputElement>(null)
    const newPasswordRef = useRef<HTMLInputElement>(null)
    const confirmNewPasswordRef = useRef<HTMLInputElement>(null)
    const currentPasswordRef = useRef<HTMLInputElement>(null)

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault()
        if(!currentPasswordRef.current?.value) {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Type your current password!' }) 
        }

        if(!newPasswordRef.current?.value) {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Type your new password!' })
        }

        if(newPasswordRef.current?.value !== confirmNewPasswordRef.current?.value) {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'The passwords arent equals!' })
        }

        if(!nameRef.current?.value) {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Type your name!' })
        }

        try {
            await api.put(`/user/update/data/${User.id}`, {
                name: nameRef.current.value,
                newPassword: newPasswordRef.current.value,
                currentPassword: currentPasswordRef.current.value
            })

            User.setName && User.setName(nameRef.current.value)
            newPasswordRef.current.value = ''
            confirmNewPasswordRef.current.value = ''
            currentPasswordRef.current.value = ''
        } catch {
            ipcRenderer.send('showError', { title: 'Erro', msg: 'Incorrect password!' })
        }
    }
    
    return (
        <div className="profile-container">
            <FiArrowLeft size={25} color='white' className='arrow-back' onClick={goBack} />
            <div className="profile-pic" style={{
                backgroundImage: `url("http://localhost:3333/userimages/${User.avatar}")`
            }}></div>
            <form onSubmit={handleUpdate} className="profile-form">
                <div className="profile-form-input">
                    <input ref={nameRef} type="text" placeholder="Name" defaultValue={User.name}/>
                    <FiUser className="profile-form-input-icon" size={20} color="white" />
                </div>
                <div className="profile-form-input">
                    <input ref={newPasswordRef} type="password" placeholder="New Password"/>
                    <FiKey className="profile-form-input-icon" size={20} color="white" />
                </div>
                <div className="profile-form-input">
                    <input ref={confirmNewPasswordRef} type="password" placeholder="Confirm new password"/>
                    <FiKey className="profile-form-input-icon" size={20} color="white" />
                </div>
                <div className="profile-form-input">
                    <input ref={currentPasswordRef} type="password" placeholder="Current Password*"/>
                    <FiKey className="profile-form-input-icon" size={20} color="white" />
                </div>
                <button type="submit" className="profile-form-button">
                    <h3>Update</h3>
                </button>
            </form>
        </div>
    )
}

export default Profile