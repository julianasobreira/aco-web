import decode from 'jwt-decode'
import { getInfo} from './localStorage'


export const isLoggedIn = key => {
  const info = getInfo(key)
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
