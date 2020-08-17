import { serialize } from 'object-to-formdata'

export const apiUploadSounds = async data => {
  const opts = { indices: true }

  const formData = serialize(data, opts)

  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/soundboards/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}

export const apiDeleteSound = async filename => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/soundboards/delete`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: filename,
      }),
    })

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}

export const apiCreateSoundboard = async data => {
  const body = JSON.stringify({
    data,
  })

  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/soundboards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    })

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}

export const apiGetSoundboard = async id => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/soundboards/${id}`, {
      method: 'GET',
      credentials: 'include',
    })

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}

export const apiGetMySoundboard = async id => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/soundboards/my/${id}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    )

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}

export const apiGetAllMySoundboards = async (page, limit) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/soundboards/mine?page=${page}&limit=10`,
      {
        method: 'GET',
        credentials: 'include',
      },
    )

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}

export const apiUpdateMySoundboard = async (data, id) => {
  const body = JSON.stringify({
    data,
  })

  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/soundboards/my/${id}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      },
    )

    const data = await res.json()

    return data
  } catch (error) {
    return error
  }
}
