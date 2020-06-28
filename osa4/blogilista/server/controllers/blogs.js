
const blogsRouter = require('express').Router()
const Blog = require('./../models/blog')
const User = require('./../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (!request.token)
    throw { name: 'AuthenticationError', message: 'Token missing.' }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id)
    throw { name: 'AuthenticationError', message: 'Invalid token.' }

  const user = await User.findById(decodedToken.id)

  const { title, author, url, likes } = request.body

  const blog = await new Blog({
    title: title,
    author: author,
    likes: likes,
    url: url,
    user: user._id
  })
    .save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.status(201).json(blog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json(blog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.status(200).json(blog.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body;
  const id = request.params.id
  const options = { new: true, runValidators: true, context: 'query' }
  const updatedBlog = await Blog.findByIdAndUpdate(id, { ...blog, user: blog.user.id }, options)
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter