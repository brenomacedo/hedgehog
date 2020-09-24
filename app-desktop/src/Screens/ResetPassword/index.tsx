import React from 'react'
import { FiArrowLeft, FiKey, FiCode } from 'react-icons/fi'
import './styles.css'

const ResetPassword = () => {
    return (
        <div className="login-container">
            <div className="login-banner-container">
                <div className="login-banner-logo"></div>
                <h2>Welcome to hedgehog!</h2>
                <p>With the token, you can reset you password!</p>
            </div>
            <div className="login-form-container">
            <FiArrowLeft className="arrow-back" size={25} color='black' />
                <h2>Reset password</h2>
                <p>Don't worry! We will solve your problem!</p>
                <form className="login-form">
                    <div style={{
                        position: 'relative'
                    }} className="input-container">
                        <input type="text" placeholder="Your token" />
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 12
                        }} className="input-icon">
                            <FiCode size={15} color='black' />
                        </div>
                    </div>
                    <div style={{
                        position: 'relative'
                    }} className="input-container">
                        <input type="password" placeholder="Your new password" />
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 12
                        }} className="input-icon">
                            <FiKey size={15} color='black' />
                        </div>
                    </div>
                    <div style={{
                        position: 'relative'
                    }} className="input-container">
                        <input type="password" placeholder="Confirm your new password" />
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 12
                        }} className="input-icon">
                            <FiKey size={15} color='black' />
                        </div>
                    </div>
                    <button type="submit">Reset password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword