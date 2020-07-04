import blogService from "../services/blog";

const reducer = (state = null, action) => {
  switch (action.type) {

    case 'INITIALIZE_BLOGS':
      return action.data

    case 'CREATE':
      return state.concat(action.data)

    case 'REMOVE':
      const deletedBlog = action.data
      return state.filter(blog => blog.id !== deletedBlog.id)

    case 'LIKE':
      const likedBlog = action.data
      return state.map(blog => blog.id === likedBlog.id ? likedBlog : blog)

    case 'COMMENT':
      const commentedBlog = action.data
      return state.map(blog => blog.id === commentedBlog.id ? commentedBlog : blog)

    default:
      return state
  }

}

export const initialize = () => {
  return async dispatch => {
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: await blogService.getBlogs()
    })
  }
}

export const create = blog => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch({ type: 'CREATE', data: createdBlog })
  }
}

export const remove = blog => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({ type: 'REMOVE', data: blog })
  }
}

export const like = blog => {
  return async dispatch => {
    const likedblog = await blogService.like(blog)
    dispatch({ type: 'LIKE', data: likedblog })
  }
}

export const comment = (blog, comment) => {
  debugger
  return async dispatch => {
    const commentedBlog = await blogService.comment(blog, comment)
    dispatch({ type: 'COMMENT', data: commentedBlog })
  }
}

export default { reducer, initialize, create, remove, like, comment }