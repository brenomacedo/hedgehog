import React, { FormEvent } from 'react'
import { FiMail, FiKey, FiUser, FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import Bar from '../../Components/Bar'
import './styles.css'

const ForgotPassword = () => {
    
    const history = useHistory()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        history.push('resetpassword')
    }

    return (
        <>
        <Bar />
        <div className="login-container-forgotpassword">
            <div className="login-banner-container">
                <div className="login-banner-logo"></div>
                <h2>Did you forget your password?</h2>
                <p>No problem! Follow these steps to recover it!</p>
            </div>
            <div className="login-form-container">
                <FiArrowLeft onClick={() => history.goBack()} className="arrow-back" size={25} color='white' />
                <h2>Reset password</h2>
                <p>Type your email to send an verification email!</p>
                <form onSubmit={handleSubmit} className="login-form">
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
        </>
    )
}

export default ForgotPassword