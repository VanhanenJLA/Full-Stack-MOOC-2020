import React, { useState, useEffect } from 'react'
import blogService from './blog-service'
import loginService from './login-service'
import { useSelector, useDispatch } from 'react-redux'
import { show } from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'

export const App = () => {

  const [user, setUser] = useState(null)

  // const [blogs, setBlogs] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const userJSON = window.localStorage.user
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    (async () => setBlogs(await blogService.getBlogs()))()
  }, [])

  const t = (callback) => {
    try {
      callback()
    } catch (error) {
      dispatch(show({ message: `${error.response.data.message}`, style: 'error' }))
    }
  }

  const create = async blog => {
    t(dispatch(blogsReducer.remove(blog)))
  }

  const remove = async blog => {
    const { title, author } = blog
    if (!window.confirm(`Do you want to remove '${title}' by ${author}?`)) return
    try {
      dispatch(blogsReducer.remove(blog))
    } catch (error) {
      dispatch(show({ message: `${error.response.data.message}`, style: 'error' }))
    }
  }

  const like = async blog => {
    try {
      const { title, author } = await blogService.likeBlog(blog)
      dispatch(show({ message: `Liked blog '${title}' by ${author}.`, style: 'success' }))
      setBlogs(await blogService.getBlogs())
    } catch (error) {
      dispatch(show({ message: `${error.response.data.message}`, style: 'error' }))
    }
  }

  const login = async credentials => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.user = JSON.stringify(user)
      setUser(user)
      dispatch(show({ message: `${user.name} logged in.`, style: 'success' }))
    } catch (error) {
      dispatch(show({ message: `${error.response.data.message}`, style: 'error' }))
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    dispatch(show({ message: `${user.name} logged out.`, style: 'success' }))
  }

  return (
    <>
      <Login login={login} user={user}></Login>
      <User user={user} logout={logout}></User>
      <Notification></Notification>
      <NewBlog add={add} user={user}></NewBlog>
      <Blogs blogs={blogs} like={like} remove={remove} user={user}></Blogs>
    </>
  )

}

export const User = ({ user, logout }) => {
  if (!user) return null;
  return (
    <p>Logged in as {user.name} <button type="button" onClick={() => logout()}>Logout</button></p>
  )
}

export const NewBlog = ({ add, user }) => {

  const [isCreating, setIsCreating] = useState(false)
  const [newBlog, setNewBlog] = useState({})

  if (!user) return null
  if (!isCreating)
    return (
      <button id="new-blog-button" type="button" onClick={() => setIsCreating(true)}>New blog</button>
    )

  return (
    <>
      <h2>Add blog</h2>
      <form>
        <div>
          <p>title: <input id="title-input" onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} /> </p>
          <p>author: <input id="author-input" onChange={e => setNewBlog({ ...newBlog, author: e.target.value })} /> </p>
          <p>url: <input id="url-input" onChange={e => setNewBlog({ ...newBlog, url: e.target.value })} /> </p>
        </div>
        <button id="add-blog-button" type="button" onClick={() => add(newBlog)}>Add</button>
        <button type="button" onClick={() => setIsCreating(false)}>Cancel</button>
      </form>
    </>
  )
}

export const Blogs = ({ blogs, like, remove, user }) => {
  if (!blogs.length) return <p>No blogs to display!</p>
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.sort((b, a) => a.likes - b.likes).map(blog => <Blog key={blog.id} blog={blog} like={like} remove={remove} user={user} />)}
    </div>
  )
}

export const Blog = ({ blog, like, remove, user }) => {

  const [isExpanded, setIsExpanded] = useState(false)
  const { title, author, url, likes } = blog

  const canRemove = (blog, remove) => {
    if (!blog.user?.username) return null;
    if (user?.username !== blog.user.username) return null;
    return <button onClick={() => remove(blog)}>Remove</button>
  }

  if (isExpanded) return (
    <div className="blog">
      <p>{title} <button onClick={() => setIsExpanded(false)}>Hide</button> </p>
      <p>{author}</p>
      <p>{url}</p>
      <p>Likes: <likes>{likes}</likes> <button onClick={() => like(blog)}>Like</button></p>
      <p>{canRemove(blog, remove)}</p>
    </div>
  )
  return (
    <div className="blog">
      {title} {author} <button onClick={() => setIsExpanded(true)}>View</button>
    </div>
  )
}

export const Notification = () => {

  const notification = useSelector(({ notification }) => notification)

  if (!notification) return null;
  const { style, message } = notification

  return (
    <div className={`notification-${style} notification`}>
      <p>{message}</p>
    </div>
  )
}

export const Login = ({ login, user }) => {

  const [credentials, setCredentials] = useState({})

  if (user) return null;

  return (
    <>
      <h2>Login</h2>
      <form id="login-form">
        <div>
          <p> username <input id="username-input" onChange={e => setCredentials({ ...credentials, username: e.target.value })} /> </p>
          <p> password <input id="password-input" onChange={e => setCredentials({ ...credentials, password: e.target.value })} type="password" /> </p>
        </div>
        <button id="login-button" onClick={() => login(credentials)} type="button">login</button>
      </form>
    </>
  )
}

