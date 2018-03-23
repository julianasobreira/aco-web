import decode from 'jwt-decode'
const ACCESS_TOKEN_KEY = 'access_token'

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export const setToken = token => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const isLoggedIn = () => {
  const token = getToken()
  return token && !isTokenExpired(token)
}

const getTokenExpirationDate = encodedToken => {
  const token = decode(encodedToken)
  if (!token.exp) { 
    return null
  }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

const isTokenExpired = token => {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
