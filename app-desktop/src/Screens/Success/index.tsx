import React, { FormEvent } from 'react'
import { FiMail, FiKey, FiUser, FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import Bar from '../../Components/Bar'

const Success = () => {
    
    const history = useHistory()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        history.push('/')
    }

    return (
        <>
        <Bar />
        <div className="login-container-forgotpassword">
            <div className="login-banner-container">
                <div className="login-banner-logo"></div>
            </div>
            <div className="login-form-container">
                <h2>Success!</h2>
                <p>Your password has been redefined!</p>
                <form onSubmit={handleSubmit} className="login-form">
                    
                    <button type="submit">Back to login</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Success