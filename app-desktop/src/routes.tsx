import React, { useContext, useEffect } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import ForgotPassword from './Screens/ForgotPassword'
import InitialScreen from './Screens/InitialScreen'
import Login from './Screens/Login'
import Profile from './Screens/Profile'
import Register from './Screens/Register'
import ResetPassword from './Screens/ResetPassword'
import api from './api/api'
import UserContext from './Contexts/UserContext'
const { ipcRenderer } = window.require('electron')

const Routes = () => {

    interface IUser {
        id: number
        name: string
        email: string
        avatar: string
    }

    const User = useContext(UserContext)

    useEffect(() => {
        console.log('ola mundo')
        ipcRenderer.send('getToken')
        ipcRenderer.on('token', (event, args) => {
            console.log(args)
            if(args) {
                const authorization = args
    
                api.get<IUser>('/user/token', {
                    headers: {
                        authorization
                    }
                }).then(resp => {
                    User.setIsAuth && User.setIsAuth(true)
                    User.setId && User.setId(resp.data.id)
                    User.setName && User.setName(resp.data.name)
                    User.setEmail && User.setEmail(resp.data.email)
                    User.setAvatar && User.setAvatar(resp.data.avatar)
                    User.setToken && User.setToken(authorization)
                }).catch(err => {
    
                })
            }
        })
        
    }, [])

    return (
        <HashRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/forgotpassword' component={ForgotPassword} />
                <Route exact path='/resetpassword' component={ResetPassword} />
                {User.isAuth && (
                    <>
                        <Route exact path='/home' component={InitialScreen} />
                        <Route exact path='/profile' component={Profile} />
                    </>
                )}
            </Switch>
        </HashRouter>
    )
}

export default Routes