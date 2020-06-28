const notificationReducer = (state = {}, action) => {

  switch (action.type) {

    case 'SHOW':
      return action.notification

    case 'HIDE':
      return {}

    default:
      break;
  }

  return state
}

export const show = (notification, duration) => {
  return dispatch => {
    dispatch({ type: 'SHOW', notification: notification })
    setTimeout(() => {
      dispatch(hide())
    }, duration || 5000)
  }
}

export const hide = () => {
  return { type: 'HIDE' }
}

export default notificationReducer