import React from 'react'
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
                    <input type="text" placeholder="Your email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login