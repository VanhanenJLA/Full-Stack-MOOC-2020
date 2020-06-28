const notificationReducer = (state = null, action) => {

  switch (action.type) {

    case 'SHOW':
      if (state?.timeout)
        clearTimeout(state.timeout)
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
    dispatch({
      type: 'SHOW', notification: {
        ...notification, timeout: setTimeout(() => {
          dispatch(hide())
        }, duration || 5000)
      }
    })

  }
}

export const hide = () => {
  return { type: 'HIDE' }
}

export default notificationReducer