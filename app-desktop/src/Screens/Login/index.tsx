import React from 'react'
import { FiMail, FiKey } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './styles.css'

const Login = () => {
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
                        <input type="text" placeholder="Your email" />
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
                        <input type="password" placeholder="Password" />
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 12
                        }} className="input-icon">
                            <FiKey size={15} color='black' />
                        </div>
                    </div>
                    <button type="submit">Login</button>
                    <Link to='/register' className="link-pointer">Create an account</Link>
                    <Link to='/forgotpassword' className="link-pointer">I forgot my password</Link>
                </form>
            </div>
        </div>
    )
}

export default Login