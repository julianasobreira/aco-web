import decode from 'jwt-decode'
const ACCESS_AUTH_INFO = 'access_auth_info'

export const getAuthInfo = () => {
  return JSON.parse(localStorage.getItem(ACCESS_AUTH_INFO))
}

export const clearAuthInfo = () => {
  localStorage.removeItem(ACCESS_AUTH_INFO)
}

export const setAuthInfo = info => {
  localStorage.setItem(ACCESS_AUTH_INFO, JSON.stringify(info))
}

export const isLoggedIn = () => {
  const info = getAuthInfo()
  if (!info) {
    return false
  }
  
  return info.token && !isTokenExpired(info.token)
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
