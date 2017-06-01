export const makeRequest = (url, options) => {
    return fetch(url, {...options, credentials: 'same-origin'})
}
