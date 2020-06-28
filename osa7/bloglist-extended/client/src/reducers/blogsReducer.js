import blogService from "../blog-service";

const reducer = (state = null, action) => {

  switch (action.type) {

    case 'INITIALIZE_BLOGS':
      return []

    case 'CREATE':
      return state.concat()

    case 'REMOVE':
      const blogToRemove = action.data;
      return state.filter(blog => blog.id !== blogToRemove.id)

    default:
      return state
  }

}

export const initializeBlogs = async () => {
  return async dispatch => {
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: await blogService.getBlogs()
    })
  }
}

export const create = async blog => {
  return async dispatch => {
    const createdBlog = await blogService.createBlog(blog)
    const { title, author } = createdBlog;
    dispatch({ type: 'CREATE', data: createdBlog })
    dispatch(show({ message: `A new blog '${title}' by ${author} added.`, style: 'success' }))
  }
}

export const remove = async blog => {
  return async dispatch => {
    const deletedBlog = await blogService.removeBlog(blog)
    const { title, author } = deletedBlog;
    dispatch({ type: 'REMOVE', data: deletedBlog })
    dispatch(show({ message: `Removed blog '${title}' by ${author}.`, style: 'success' }))
  }
}

export default reducer