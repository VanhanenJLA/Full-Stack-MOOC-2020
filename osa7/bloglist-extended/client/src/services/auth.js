import axios from 'axios'
const baseUrl = '/api/login'

const getUser = () => {
  try {
    return JSON.parse(window.localStorage.user)
  } catch (error) {
    return null
  }
}

const getToken = () => `bearer ${getUser().token}`

const store = user => {
  window.localStorage.user = JSON.stringify(user)
}

const login = async credentials => {
  const user = (await axios.post(baseUrl, credentials)).data
  store(user)
  return user;
}

const logout = () => {
  window.localStorage.clear()
}

export default { login, logout, getUser, getToken }