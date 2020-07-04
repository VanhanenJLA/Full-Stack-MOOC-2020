import React, { useState, useEffect, useRef } from 'react'
import authService from './services/auth'
import { useSelector, useDispatch } from 'react-redux'
import { show } from './reducers/notification'
import blogsReducer from './reducers/blogs'
import userReducer from './reducers/user'
import usersReducer from './reducers/users'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom"

export const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(blogsReducer.initialize())
    dispatch(usersReducer.initialize())
    const user = authService.getUser()
    if (user)
      dispatch(userReducer.login(user))
  }, [dispatch])

  const user = useSelector(state => state.user)

  if (!user) return (
    <>
      <Notification></Notification>
      <Login></Login>
    </>
  )

  return (

    <Router>

      <Navbar></Navbar>
      <Header></Header>

      <div className="container">
        <Notification></Notification>
        <Switch>

          <Route path="/blogs/:id">
            <Blog></Blog>
          </Route>

          <Route path="/users/:id">
            <User></User>
          </Route>

          <Route path="/users">
            <Users></Users>
          </Route>

          <Route path="/">
            <NewBlog></NewBlog>
            <Blogs></Blogs>
          </Route>

        </Switch>
      </div>

    </Router>

  )

}

export const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (!notification) return null;
  const { style, message } = notification

  return (
    <div className={`notification-${style} notification`}>
      <span>{message}</span>
    </div>
  )
}

export const Login = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [didTryLogin, setDidTryLogin] = useState(false)
  const [credentials, setCredentials] = useState({})

  if (user) return null;

  const login = async credentials => {
    try {
      setDidTryLogin(true)
      const user = await authService.login(credentials)
      dispatch(userReducer.login(user))
      dispatch(show({ message: `${user.name} logged in.`, style: 'success' }))
    } catch (error) {
      dispatch(show({ message: `${error.response.data.message}`, style: 'error' }))
    }
  }

  const bypass = async () => {
    login({ username: 'dummy', password: 'salasana' })
  }

  return (
    <>
      <form onSubmit={e => { e.preventDefault(); login(credentials) }} className={`form-signin needs-validation ${didTryLogin ? 'was-validated' : ''}`} id="login-form" noValidate>

        <img className="img-fluid" src="./logo512.png"></img>

        <div className="form-group">
          <h2>React Blogs</h2>
        </div>

        <div className="form-group">
          <input className="form-control"
            id="username-input"
            onChange={e => setCredentials({ ...credentials, username: e.target.value })}
            placeholder="Username"
            type="text"
            required
            autoFocus />
          <div className="invalid-feedback">
            Please enter a username.
      </div>
        </div>

        <div className="form-group">
          <input className="form-control"
            id="password-input"
            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            type="password"
            placeholder="Password"
            required />
          <div className="invalid-feedback">
            Please enter a password.
      </div>
        </div>

        <div className="form-group">
          <button className="btn btn-outline-primary btn-block btn-lg" id="login-button" type="submit">Login</button>
        </div>
        <p className="text-muted small"> ...or login as <span className="btn-link" onClick={bypass}>Dummy</span>.</p>
      </form>

    </>
  )
}

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <a className="navbar-brand" href="/">
        <img className="pr-2" width="32" src={require('./logo192.png')} alt="" />
        <span>React Blogs</span>
      </a>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation-navbar">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navigation-navbar">
        <ul className="navbar-nav mr-auto">

          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/">Blogs</NavLink>
          </li>

          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/users">Users</NavLink>
          </li>

        </ul>
      </div>

    </nav>
  )
}

export const Header = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(userReducer.logout())
    dispatch(show({ message: `${user.name} logged out.`, style: 'success' }))
  }

  if (!user) return null;

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">Welcome <b>{user.name}</b>!</h1>
        <button className="btn btn-outline-info float-right" type="button" onClick={() => logout()}>Logout</button>
      </div>
    </div>
  )
}

export const User = () => {

  const id = useParams().id
  const users = useSelector(state => state.users)

  if (!users) return null
  const user = users.find(u => u.id === id)

  return (
    <>
      <div className="card mb-1">
        <div className="card-header">
          <h3>{user.name}</h3>
        </div>
      </div>

      <div className="card ml-3">

        <div className="card-header">
          <span className="font-weight-bold">Blogs:</span>
        </div>


        <div className="list-group list-group-flush">
          {!user.blogs.length && <p className="list-group-item">User hasn't added any blogs yet!</p>}
          {user.blogs && user.blogs.map(blog =>
            <Link className="list-group-item" to={`/blogs/${blog.id}`} key={blog.id}>{blog.title}</Link>
          )}
        </div>
      </div>
    </>
  )
}

export const Users = () => {
  const users = useSelector(state => state.users)

  if (!users)
    return <p>No users to display!</p>

  return (

    <div className="card">

      <div className="card-header">
        <h2>Users</h2>
      </div>

      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Blogs created</th>
          </tr>
        </thead>
        <tbody className="table-hover">
          {
            users.map(user =>
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`} > {user.name}</Link>
                </td>
                <td>
                  {user.blogs.length}
                </td>
              </tr>
            )
          }
        </tbody>
      </table>


    </div>

  )

}

export const NewBlog = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [isCreating, setIsCreating] = useState(false)
  const [didTryCreate, setDidTryCreate] = useState(false)

  const [newBlog, setNewBlog] = useState({})

  const create = async blog => {
    setDidTryCreate(true)
    const { title, author } = blog;
    try {
      await dispatch(blogsReducer.create(blog))
      dispatch(show({ message: `A new blog '${title}' by ${author} added.`, style: 'success' }))
      setIsCreating(false)
      setDidTryCreate(false)
    } catch (error) {
      dispatch(show({ message: `${error.response.data.message}`, style: 'error' }))
    }
  }

  if (!user) return null
  if (!isCreating)
    return (
      <button id="new-blog-button" className="btn btn-outline-primary btn-block mb-3" type="button" onClick={() => setIsCreating(true)}>New blog</button>
    )

  return (
    <div className="card mb-3">

      <div className="card-header">
        <h2>New blog</h2>
      </div>

      <div className="card-body">

        <form className={`needs-validation ${didTryCreate ? 'was-validated' : ''}`}>
          <div className="form-group">
            <label htmlFor="title-input">Title</label>
            <input className="form-control" id="title-input" onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} required placeholder="GUI Architectures" />
          </div>

          <div className="form-group">
            <label htmlFor="author-input">Author</label>
            <input className="form-control" id="author-input" onChange={e => setNewBlog({ ...newBlog, author: e.target.value })} required placeholder="Martin Fowler" />
          </div>

          <div className="form-group">
            <label htmlFor="url-input">Url</label>
            <input className="form-control" id="url-input" onChange={e => setNewBlog({ ...newBlog, url: e.target.value })} required placeholder="https://martinfowler.com/eaaDev/uiArchs.html" />
          </div>

        </form>
      </div>

      <div className="card-footer">
        <button className="btn-outline-primary btn btn-block" id="add-blog-button" type="button" onClick={() => create(newBlog)}>Add</button>
        <button className="btn-outline-secondary btn btn-block" type="button" onClick={() => setIsCreating(false)}>Cancel</button>
      </div>

    </div>

  )
}

export const Blogs = () => {

  const blogs = useSelector(state => state.blogs)

  if (!blogs?.length) return <p>No blogs to display!</p>
  return (
    <div className="card">
      <div className="card-header">
        <h2>Blogs</h2>
      </div>
      <div className="list-group-flush">
        {blogs.sort((b, span) => span.likes - b.likes).map(blog =>
          <span className="list-group-item" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} </Link> - {blog.author}
          </span>
        )}
      </div>
    </div>
  )
}

export const Blog = () => {

  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const commentInput = useRef(null)

  if (!blogs) return null
  const blog = blogs.find(blog => blog.id === id)
  if (!blog) return null

  const { title, author, url, likes } = blog

  const like = blog => {
    dispatch(blogsReducer.like(blog))
    dispatch(show({ message: `Liked blog '${title}' by ${author}.`, style: 'success' }))
  }

  const canRemove = (blog, user) => {
    if (!user) return false
    if (user.username !== blog.user.username) return false
    return true
  }

  const comment = comment => {
    dispatch(blogsReducer.comment(blog, comment))
    commentInput.current.value = ''
  }

  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          <h4>Blog <span className="text-muted">{`<${blog.id}>`}</span></h4>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <small className="text-muted">Title</small>
            <p className="">{title}</p>
          </li>
          <li className="list-group-item">
            <small className="text-muted">Author</small>
            <p>{author}</p>
          </li>
          <li className="list-group-item">
            <small className="text-muted">Source</small>
            <p><span href={url}>{url}</span></p>
          </li>
          <li className="list-group-item">
            <small className="text-muted">Likes</small>
            <p>{likes}</p>
          </li>
        </ul>

        <div className="card-body">
          <button className="btn btn-outline-success btn-block" onClick={() => like(blog)}>Like</button>
          {canRemove(blog, user) &&
            <RemoveBlog blog={blog}></RemoveBlog>}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4>Comments</h4>
        </div>
        <div className="card-body">
          {blog.comments && blog.comments.map(comment => <li>{comment}</li>)}
          {!blog.comments.length &&
            <p className="text-muted">This blog hasn't been commented yet.</p>
          }
        </div>
        <div className="card-footer">
          <form className="d-flex">
            <input ref={commentInput} className="form-control mr-1" type="search" placeholder="Leave a comment." />
            <button onClick={() => comment(commentInput.current.value)} className="btn btn-outline-secondary" type="button">Submit</button>
          </form>
        </div>
      </div>
    </>
  )

}

const RemoveBlog = ({ blog }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const remove = async blog => {
    const { title, author } = blog

    if (!window.confirm(`Do you want to remove '${title}' by ${author}?`))
      return

    try {
      dispatch(show({ message: `Removed blog '${title}' by ${author}.`, style: 'success' }))
      await dispatch(blogsReducer.remove(blog))
      history.push('/')
    } catch (error) {
      dispatch(show({ message: `${error.response.data.message}`, style: 'error' }))
    }
  }

  return <button className="btn btn-outline-danger btn-block" onClick={() => remove(blog)}>Remove</button>
}
