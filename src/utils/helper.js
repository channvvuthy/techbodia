export const queryString = props => {
    return Object.keys(props)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(props[key])}`)
        .join('&');
}