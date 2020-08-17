export const apiSignup = async (username, email, password, passwordConfirm) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      }),
    })

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}

export const apiLogin = async (email, password) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}

export const apiLogout = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/logout`, {
      method: 'GET',
      credentials: 'include',
    })

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}

export const apiForgotPassword = async email => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/forgotPassword`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}

export const apiResetPassword = async (token, password, passwordConfirm) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/users/resetPassword/${token}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
          passwordConfirm: passwordConfirm,
        }),
      },
    )

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}

export const apiIsLoggedIn = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/isLoggedIn`, {
      method: 'POST',
      credentials: 'include',
    })

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}
