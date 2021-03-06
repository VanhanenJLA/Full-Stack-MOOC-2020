const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { login, dummyUser } = require('./common')

const api = supertest(app)

const newBlog = {
  title: "Dummy-title",
  author: "Dummy-author",
  url: "Dummy-url"
}

const initialBlogs = [
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
  { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
  { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
  { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

const blogsInDb = async () => {
  return (await Blog.find({})).map(b => b.toJSON())
}


beforeAll(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('GET /blogs', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blog ids are formatted correctly', async () => {
    const blogs = await blogsInDb()
    expect(blogs[0].id).toBeDefined()
    expect(blogs[0]._id).not.toBeDefined()
    expect(blogs[0].__ver).not.toBeDefined()
  })

})

describe('POST /blogs', () => {
  test('succeeds with code 201 when valid data', async () => {

    const blogsAtStart = await blogsInDb()
    const token = await login(dummyUser)
    await api
      .post('/api/blogs')
      .send({ ...newBlog, user: token.id })
      .set('Authorization', 'bearer ' + token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)

    const urls = blogsAtEnd.map(b => b.url)
    expect(urls).toContain(
      newBlog.url
    )
  })

  test('fails with status code 400 when data invalid', async () => {
    const blogsAtStart = await blogsInDb()
    const invalidBlog = {}
    const token = await login(dummyUser)
    await api
      .post('/api/blogs')
      .send({ ...invalidBlog, user: token.id })
      .set('Authorization', 'bearer ' + token)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('undefined likes on blog creation defaults to 0', async () => {
    const token = await login(dummyUser)
    const response = await api
      .post('/api/blogs')
      .send({ author: 'Dummy', title: 'Dummy', url: 'Dummy', user: token.id })
      .set('Authorization', 'bearer ' + token)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)
  })

  test('tokenless requests fail with 401', async () => {
    const token = await login(dummyUser)
    const response = await api
      .post('/api/blogs')
      .send({ ...newBlog, user: token.id })
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.message).toContain('Token missing.')
  })
})

describe('DELETE /blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {

    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const urls = blogsAtEnd.map(blog => blog.url)
    expect(urls).not.toContain(blogToDelete.url)
  })
})


describe('PUT /blogs', () => {
  test('succeeds with status code 200 and returns updated blog', async () => {
    const firstBlogInDb = (await blogsInDb())[0]
    const blog = { ...firstBlogInDb, likes: 10 }
    const response = await api
      .put(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(blog)
  })
})

afterAll(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
  await mongoose.connection.close()
})