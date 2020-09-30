import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { FiMail, FiKey } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../api/api'
import UserContext from '../../Contexts/UserContext'
import './styles.css'
const { ipcRenderer } = window.require('electron')

const Login = () => {

    interface IUser {
        id: number
        name: string
        email: string
        avatar: string
    }

    interface IUserContext {
        user: IUser
        token: string
    }

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const User = useContext(UserContext)

    const history = useHistory()

    useEffect(() => {
        if(User.isAuth) {
            history.push('/home')
        }
    }, [User.isAuth])

    const handleLogin = async () => {

        // try {
        //     const user = await api.post<IUserContext>('/user/auth', {
        //         email: emailRef.current?.value,
        //         password: passwordRef.current?.value
        //     })

        //     User.setIsAuth && User.setIsAuth(true)
        //     User.setId && User.setId(user.data.user.id)
        //     User.setName && User.setName(user.data.user.name)
        //     User.setEmail && User.setEmail(user.data.user.email)
        //     User.setAvatar && User.setAvatar(user.data.user.avatar)
        //     User.setToken && User.setToken(`Bearer ${user.data.token}`)

            
            
        //     history.push('/home')
            
        // } catch {
        //     console.log('error')
        // }

        ipcRenderer.send('teste')

    }

    return (
        <div className="login-container">
            <div className="login-banner-container">
                <div className="login-banner-logo"></div>
                <h2>Welcome to hedgehog!</h2>
                <p>Come with us and listen to your favorite musics!</p>
            </div>
            <div className="login-form-container">
                <h2>Login</h2>
                <p>Hey! Lets get started!</p>
                <form className="login-form">
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
                    <div style={{
                        position: 'relative'
                    }} className="input-container">
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 12
                        }} className="input-icon">
                            <FiKey size={15} color='black' />
                        </div>
                    </div>
                    <button onClick={handleLogin} type="submit">Login</button>
                    <Link to='/register' className="link-pointer">Create an account</Link>
                    <Link to='/forgotpassword' className="link-pointer">I forgot my password</Link>
                </form>
            </div>
        </div>
    )
}

export default Login