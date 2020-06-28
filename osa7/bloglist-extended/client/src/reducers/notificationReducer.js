const notificationReducer = (state = null, action) => {

  switch (action.type) {

    case 'SET_NOTIFICATION':
      return action.notification

    case 'CLEAR_NOTIFICATION':
      return null

    default:
      return state
  }

}

export const show = (notification, duration) => {
  return async dispatch => {
    dispatch({ type: 'SET_NOTIFICATION', notification: notification })
    setTimeout(() => {
      dispatch(hide())
    }, duration || 5000)
  }
}

export const hide = () => {
  return { type: 'CLEAR_NOTIFICATION' }
}

export default notificationReducer