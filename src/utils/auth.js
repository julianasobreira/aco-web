import decode from 'jwt-decode'
import { getInfo} from './localStorage'


export const isLoggedIn = key => {
  const info = getInfo(key)
  if (!info) {
    return false
  }
  
  return info.token && !isTokenExpired(info.token)
}

export const getTokenExpirationDate = encodedToken => {
  const token = decode(encodedToken)
  if (!token.exp) { 
    return null
  }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

export const isTokenExpired = token => {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}

export const getAuthData = token => {
  const { email, codCurso } = decode(token);
  return {
    token,
    email, 
    codCurso }
}
