const filterReducer = (state = '', action) => {

  const filter = action?.filter

  switch (action.type) {

    case 'SET_FILTER':
      return filter

    case 'CLEAR':
      return ""

    default:
      break;
  }

  return state
}

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}

export const clear = () => {
  return { type: 'CLEAR', filter: '' }
}

export default filterReducer