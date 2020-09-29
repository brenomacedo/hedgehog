import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { FiMail, FiKey } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../../Contexts/UserContext'
import './styles.css'

const Login = () => {

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const User = useContext(UserContext)

    const history = useHistory()

    useEffect(() => {
        if(User.isAuth) {
            history.push('/home')
        }
    }, [User.isAuth])

    const handleLogin = useCallback(() => {
        console.log(emailRef.current?.value)
        console.log(passwordRef.current?.value)
    }, [])

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