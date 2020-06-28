import userService from "../services/user";

const reducer = (state = null, action) => {
  switch (action.type) {

    case 'INITIALIZE_USERS':
      return action.users

    default:
      return state
  }
}

export const initialize = () => {
  return async dispatch => {
    const users = await userService.getUsers()
    dispatch({
      type: 'INITIALIZE_USERS',
      users
    })
  }
}



export default { reducer, initialize }