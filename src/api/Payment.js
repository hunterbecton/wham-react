export const apiGetSession = async (id, customer) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/payments/checkout-session/${id}-${customer}`, {
            method: 'GET',
            credentials: 'include',
        })

        const data = await res.json()

        return data
    } catch (error) {
        return error
    }
}
export const apiGetPortalSession = async (customer) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/payments/portal-session/${customer}`, {
            method: 'POST',
            credentials: 'include',
        })

        const data = await res.json()

        return data
    } catch (error) {
        return error
    }
}

export const apiGetNewCustomerId = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/payments/customer`, {
            method: 'GET',
            credentials: 'include',
        })

        const data = await res.json()

        return data

    } catch (error) {
        return error
    }
}