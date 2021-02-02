import React, { Component } from 'react'
import { Router } from '@reach/router'

import Homepage from './components/Homepage/Homepage'
import SignupForm from './components/Auth/SignupForm'
import LoginForm from './components/Auth/LoginForm'
import Privacy from './components/Privacy/Privacy'
import Tos from './components/Tos/Tos'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'
import PrivateRoute from './components/Auth/PrivateRoute'
import SoundboardEditor from './components/Editor/SoundboardEditor'
import Soundboard from './components/Sound/Soundboard'
import Dashboard from './components/Dashboard/Dashboard'
import UpdateProfileForm from './components/Profile/UpdateProfileForm'

class App extends Component {
  render() {
    return (
      <Router>
        <Homepage path="/" />
        <SignupForm path="signup" />
        <LoginForm path="login" />
        <ForgotPassword path="forgot-password" />
        <ResetPassword path="reset-password" />
        <Privacy path="privacy" />
        <Tos path="tos" />
        <Soundboard path="soundboard/:sbId" />
        <PrivateRoute
          as={SoundboardEditor}
          roles={['user', 'pro', 'admin']}
          path="soundboard/create"
        />
        <PrivateRoute
          as={SoundboardEditor}
          roles={['user', 'pro', 'admin']}
          path="soundboard/edit/:sbId"
        />
        <PrivateRoute
          as={Dashboard}
          roles={['user', 'pro', 'admin']}
          path="dashboard"
        />
        <PrivateRoute
          as={UpdateProfileForm}
          roles={['user', 'pro', 'admin']}
          path="profile"
        />
      </Router>
    )
  }
}

export default App
