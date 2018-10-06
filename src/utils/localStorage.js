export const ACCESS_AUTH_INFO = 'access_auth_info'
export const ACCESS_SOLUTION_INFO = 'access_solution_info'
export const ACCESS_FORM_INFO = 'access_form_info'

export const getInfo = key => {
  return JSON.parse(localStorage.getItem(key))
}

export const clearInfo = key => {
  localStorage.removeItem(key)
}

export const clearAllInfo = () => {
  localStorage.removeItem(ACCESS_SOLUTION_INFO)
  localStorage.removeItem(ACCESS_FORM_INFO)
  localStorage.removeItem(ACCESS_AUTH_INFO)
}

export const clearAuthInfo = () => {
  localStorage.removeItem(ACCESS_AUTH_INFO)
}

export const setInfo = (key, info) => {
  localStorage.removeItem(key)
  localStorage.setItem(key, JSON.stringify(info))
}