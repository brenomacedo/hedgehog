import React from 'react'
import { FiUser, FiKey, FiArrowLeft } from 'react-icons/fi'
import './styles.css'

const Profile = () => {
    return (
        <div className="profile-container">
            <FiArrowLeft size={25} color='white' className='arrow-back' />
            <div className="profile-pic"></div>
            <form className="profile-form">
                <div className="profile-form-input">
                    <input type="text" placeholder="Name"/>
                    <FiUser className="profile-form-input-icon" size={20} color="white" />
                </div>
                <div className="profile-form-input">
                    <input type="password" placeholder="New Password"/>
                    <FiKey className="profile-form-input-icon" size={20} color="white" />
                </div>
                <div className="profile-form-input">
                    <input type="password" placeholder="Confirm new password"/>
                    <FiKey className="profile-form-input-icon" size={20} color="white" />
                </div>
                <div className="profile-form-input">
                    <input type="password" placeholder="Current Password*"/>
                    <FiKey className="profile-form-input-icon" size={20} color="white" />
                </div>
            </form>
        </div>
    )
}

export default Profile