import authService from "../services/auth";

const reducer = (state = null, action) => {
  switch (action.type) {

    case 'LOGIN':
      return action.user

    case 'LOGOUT':
      return null

    default:
      return state
  }

}

export const login = user => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    authService.logout()
    dispatch({
      type: 'LOGOUT',
    })
  }
}


export default { reducer, login, logout }