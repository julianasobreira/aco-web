export const getInfo = key => {
  return JSON.parse(localStorage.getItem(key))
}

export const clearInfo = key => {
  localStorage.removeItem(key)
}

export const setInfo = (key, info) => {
  localStorage.setItem(key, JSON.stringify(info))
}