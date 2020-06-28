import axios from 'axios'
const baseUrl = '/api/blogs'

const user = () => JSON.parse(window.localStorage.user)
const token = () => `bearer ${user().token}`
const config = () => {
  return {
    headers: { Authorization: token() }
  }
}

export const createBlog = async blog =>
  (await axios.post(baseUrl, blog, config())).data

export const likeBlog = async blog => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 }
  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog)
  return response.data
}

export const removeBlog = async blog => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, blog, config())
  return response.data
}

export const getBlogs = async () =>
  (await axios.get(baseUrl)).data

export default blogService
