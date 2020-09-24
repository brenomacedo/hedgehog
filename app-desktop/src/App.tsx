import React from 'react'
import './App.css'
import Bar from './Components/Bar'
import ForgotPassword from './Screens/ForgotPassword'
import Login from './Screens/Login'
import Register from './Screens/Register'
import ResetPassword from './Screens/ResetPassword'

function App() {
  return (
    <div className="App">
      <Bar />
      <Login />
    </div>
  )
}

export default App
