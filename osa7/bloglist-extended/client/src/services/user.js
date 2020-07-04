import axios from 'axios'

const baseUrl = '/api/users'

export const getUsers = async () => {
  return (await axios.get(baseUrl)).data
}

export default { getUsers }