import axios from 'axios'
import authService from './auth'

const config = () => {
  return {
    headers: { Authorization: authService.getToken() }
  }
}

const baseUrl = '/api/blogs'

export const getBlogs = async () => {
  const blogs = (await axios.get(baseUrl)).data
  return blogs
}

export const create = async blog => {
  const createdBlog = (await axios.post(baseUrl, blog, config())).data
  return createdBlog
}

export const remove = async blog => {
  await axios.delete(`${baseUrl}/${blog.id}`, config())
  return blog
}

export const like = async blog => {
  blog.likes += 1
  const likedBlog = (await axios.put(`${baseUrl}/${blog.id}`, blog)).data
  return likedBlog
}

export const comment = async (blog, comment) => {
  debugger
  const commentedBlog = (await axios.post(`${baseUrl}/${blog.id}/comments`, { comment }, config())).data
  return commentedBlog
}

export default { getBlogs, create, remove, like, comment }