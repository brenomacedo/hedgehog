import React, { FormEvent, useEffect, useRef } from 'react'
import { FiArrowLeft, FiKey, FiCode } from 'react-icons/fi'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import api from '../../api/api'
import Bar from '../../Components/Bar'
import './styles.css'
const { ipcRenderer } = window.require('electron')

const ResetPassword = () => {

    const history = useHistory()
    const params = useParams<{ email: string }>()

    const tokenRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()


        if(!passwordRef.current?.value) {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Type your password!' })
        }

        if(passwordRef.current.value !== confirmPasswordRef.current?.value) {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'The passwords are not equals!' })
        }

        try {
            await api.put('/password/reset', {
                email: params.email,
                password: passwordRef.current?.value,
                token: tokenRef.current?.value
            })

            history.push('/success')
        } catch {
            return ipcRenderer.send('showError', { title: 'Error', msg: 'Invalid token!' })
        }
    }

    return (
        <>
        <Bar />
        <div className="login-container-resetpassword">
            <div className="login-banner-container">
                <div className="login-banner-logo"></div>
                <h2>Welcome to hedgehog!</h2>
                <p>With the token, you can reset you password!</p>
            </div>
            <div className="login-form-container">
            <FiArrowLeft onClick={() => history.goBack()} className="arrow-back" size={25} color='white' />
                <h2>Reset password</h2>
                <p>Don't worry! We will solve your problem!</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <div style={{
                        position: 'relative'
                    }} className="input-container">
                        <input ref={tokenRef} className="inputnumber" type="text" placeholder="Your token" />
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
                        <input ref={passwordRef} type="password" placeholder="Your new password" />
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
                        <input ref={confirmPasswordRef} type="password" placeholder="Confirm your new password" />
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
        </>
    )
}

export default ResetPassword