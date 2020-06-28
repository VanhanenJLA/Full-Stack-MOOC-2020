import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Blog, CreateBlogForm } from './Bloglist'

const user = {
  name: 'tyhäm',
  username: 'dummy',
}

const blog = {
  _id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  user: user
}

test('minimized blog shows only title and author', () => {
  const component = render(
    <Blog blog={blog} user={user} ></Blog>
  )
  const { title, author, url, likes } = blog;

  expect(component.container).toHaveTextContent(title)
  expect(component.container).toHaveTextContent(author)
  expect(component.container).not.toHaveTextContent(url)
  expect(component.container).not.toHaveTextContent('Likes:')

})

test('maximized blog shows title, author, url and likes', () => {

  const component = render(
    <Blog blog={blog} user={user} ></Blog>
  )
  const { title, author, url, likes } = blog;

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  expect(component.container).toHaveTextContent(title)
  expect(component.container).toHaveTextContent(author)
  expect(component.container).toHaveTextContent(url)
  expect(component.container).toHaveTextContent('Likes: ' + likes)

})

test('pressing like twice results in two calls', () => {

  const likeBlog = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} like={likeBlog} ></Blog>
  )

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeBlog.mock.calls).toHaveLength(2)

})

test('creating a blog fires an event with matchin parameters to form input values', () => {

  const addBlog = jest.fn()
  const component = render(
    <CreateBlogForm add={addBlog} user={user}></CreateBlogForm>
  )

  const newBlog = component.getByText('New blog')
  fireEvent.click(newBlog)

  const titleInput = component.container.querySelector('#title-input')
  const authorInput = component.container.querySelector('#author-input')
  const urlInput = component.container.querySelector('#url-input')

  fireEvent.change(titleInput, { target: { value: blog.title } })
  fireEvent.change(authorInput, { target: { value: blog.author } })
  fireEvent.change(urlInput, { target: { value: blog.url } })

  const addButton = component.getByText('Add')
  fireEvent.click(addButton)


  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toEqual({ title: blog.title, author: blog.author, url: blog.url })

})