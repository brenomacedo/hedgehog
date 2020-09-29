import React, { useContext, useEffect } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import ForgotPassword from './Screens/ForgotPassword'
import InitialScreen from './Screens/InitialScreen'
import Login from './Screens/Login'
import Profile from './Screens/Profile'
import Register from './Screens/Register'
import ResetPassword from './Screens/ResetPassword'
import ElectronStorage from 'electron-json-storage'
import api from './api/api'
import UserContext from './Contexts/UserContext'

const Routes = () => {

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

    const User = useContext(UserContext)

    useEffect(() => {
        ElectronStorage.get('token', (error, data) => {
            if(error) {
                return
            }

            const authorization = `Bearer ${data}`

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
            }).catch(err => {

            })
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
                        <Route exact path='/profile' component={Register} />
                    </>
                )}
                <Redirect from='*' to='/' />
            </Switch>
        </HashRouter>
    )
}

export default Routes