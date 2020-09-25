import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import ForgotPassword from './Screens/ForgotPassword'
import Login from './Screens/Login'
import Profile from './Screens/Profile'
import Register from './Screens/Register'
import ResetPassword from './Screens/ResetPassword'

const Routes = () => {
    return (
        <HashRouter>
            <Route exact path='/' component={Profile} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
            <Route exact path='/resetpassword' component={ResetPassword} />
        </HashRouter>
    )
}

export default Routes