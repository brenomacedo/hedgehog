import React, { FormEvent, useEffect, useRef } from 'react'
import { FiMail, FiKey, FiUser, FiArrowLeft } from 'react-icons/fi'
import { useHistory, useLocation } from 'react-router-dom'
import api from '../../api/api'
import Bar from '../../Components/Bar'
import './styles.css'
const { ipcRenderer } = window.require('electron')

const ForgotPassword = () => {
    
    const history = useHistory()
    
    const emailRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(!emailRef.current?.value) {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Type your email!' })
        }

        try {
            await api.put('/password/token', {
                email: emailRef.current.value
            })

            history.push(`resetpassword/${emailRef.current.value}`)
        } catch {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Invalid email!' })
        }
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
                        <input ref={emailRef} type="text" placeholder="Your email" />
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