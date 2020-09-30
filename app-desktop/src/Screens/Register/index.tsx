import React from 'react'
import { FiMail, FiKey, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Bar from '../../Components/Bar'
import './styles.css'

const Register = () => {
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
                        <input type="text" placeholder="Your name" />
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
                        <input type="password" placeholder="Password" />
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
                        <input type="password" placeholder="Confirm your password" />
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