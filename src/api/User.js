export const apiGetMe = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/me`, {
            method: 'GET',
            credentials: 'include',
        })

        const data = await res.json()

        return data

    } catch (error) {
        return error
    }
}

export const apiUpdateMe = async (data) => {
    const body = JSON.stringify({
        data,
    })

    try {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/updateMe`, {
            method: 'PATCH',
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