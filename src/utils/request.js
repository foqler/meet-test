export const methods = {
    get: 'GET',
    post: 'POST',
    delete: 'DELETE',
    put: 'PUT',
    patch: 'PATCH',
};

export const request = async (method, url, data, extraHeaders) => {
    try {
        const headers = Object.assign({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': '',
            ...extraHeaders
        })
        const body = data ? JSON.stringify(data) : data
        const response = await fetch(url, {
            method,
            headers,
            body
        })

        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message)
    }
}
