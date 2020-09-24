import React from 'react'
import { FiMail, FiKey, FiUser, FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import './styles.css'

const ForgotPassword = () => {
    
    const history = useHistory()

    return (
        <div className="login-container-forgotpassword">
            <div className="login-banner-container">
                <div className="login-banner-logo"></div>
                <h2>Welcome to hedgehog!</h2>
                <p>You can reset your password here!</p>
            </div>
            <div className="login-form-container">
                <FiArrowLeft onClick={() => history.push('/')} className="arrow-back" size={25} color='black' />
                <h2>Reset password</h2>
                <p>Don't worry! We will solve your problem!</p>
                <form className="login-form">
                    <div style={{
                        position: 'relative'
                    }} className="input-container">
                        <input type="text" placeholder="Your email" />
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 12
                        }} className="input-icon">
                            <FiMail size={15} color='black' />
                        </div>
                    </div>
                    <button type="submit">Send an email verification</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword