import React, { useState, useContext, createContext } from 'react'
import {
  apiSignup,
  apiLogin,
  apiLogout,
  apiForgotPassword,
  apiResetPassword,
  apiIsLoggedIn,
} from '../api/Auth'
import { navigate } from '@reach/router'

export const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  const isLoggedIn = async () => {
    setIsAuthenticating(true)

    const res = await apiIsLoggedIn()

    if (res.status !== 'success') {
      setUser(null)
    }

    if (res.status === 'success') {
      setUser(res.data)
    }
    setIsAuthenticating(false)
  }

  const signup = async ({ username, email, password, passwordConfirm }) => {
    try {
      const res = await apiSignup(username, email, password, passwordConfirm)

      if (res.status === 'success') {
        setUser(res.data.user)
      }

      return res
    } catch (error) {
      return error
    }
  }

  const login = async ({ email, password }) => {
    try {
      const res = await apiLogin(email, password)

      if (res.status === 'success') {
        setUser(res.data.user)
      }

      return res
    } catch (error) {
      return error
    }
  }

  const logout = async () => {
    try {
      const res = await apiLogout()
      setUser(null)
      navigate('/')
      return res
    } catch (error) {
      setUser(null)
      navigate('/')
      return error
    }
  }

  const forgotPassword = async ({ email }) => {
    try {
      const res = await apiForgotPassword(email)

      return res
    } catch (error) {
      return error
    }
  }

  const resetPassword = async ({ token, password, passwordConfirm }) => {
    try {
      const res = await apiResetPassword(token, password, passwordConfirm)

      return res
    } catch (error) {
      return error
    }
  }

  return {
    user,
    isAuthenticating,
    isLoggedIn,
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
  }
}
