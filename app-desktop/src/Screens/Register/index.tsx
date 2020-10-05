import React, { FormEvent, useRef } from 'react'
import { FiMail, FiKey, FiUser } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../api/api'
import Bar from '../../Components/Bar'
import './styles.css'
const { ipcRenderer } = window.require('electron')

const Register = () => {

    const history = useHistory()

    const emailRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)

    const register = async (e: FormEvent) => {
        e.preventDefault()


        if(passwordRef.current?.value !== confirmPasswordRef.current?.value) {
            ipcRenderer.send('showError', { title: 'Error', msg: 'The passwords arent equals!' })
        }

        try {
            await api.post('/user/create', {
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })

            history.push('/')
            
        } catch {
            ipcRenderer.send('showError', { title: 'Error', msg: 'Email already exists!' })
        }
    }

    return (
        <>
        <Bar />
        <div className="login-container">
            <div className="login-banner-container">
                <div className="login-banner-logo"></div>
                <h2>Welcome to hedgehog!</h2>
                <p>Register and start your journey with musics!</p>
            </div>
            <div className="login-form-container">
                <h2>Register</h2>
                <p>Hey! Lets create your account!</p>
                <form onSubmit={register} className="login-form">
                    <div style={{
                        position: 'relative'
                    }} className="input-container">
                        <input required ref={emailRef} type="email" placeholder="Your email" />
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 12
                        }} className="input-icon">
                            <FiMail size={15} color='black' />
                        </div>
                    </div>
                    <div style={{
                        position: 'relative'
                    }} className="input-container">
                        <input required ref={nameRef} type="text" placeholder="Your name" />
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 12
                        }} className="input-icon">
                            <FiUser size={15} color='black' />
                        </div>
                    </div>
                    <div style={{
                        position: 'relative'
                    }} className="input-container">
                        <input required ref={passwordRef} type="password" placeholder="Password" />
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
                        <input required ref={confirmPasswordRef} type="password" placeholder="Confirm your password" />
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 12
                        }} className="input-icon">
                            <FiKey size={15} color='black' />
                        </div>
                    </div>
                    <button type="submit">Register</button>
                    <Link className="link-pointer" to="/">I already have an account</Link>
                </form>
            </div>
        </div>
        </>
    )
}

export default Register