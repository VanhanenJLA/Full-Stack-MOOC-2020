import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      neutral: 0,
      bad: 0
    })
  })

  test('multiple are incremented', () => {

    let state = initialState
    state = counterReducer(state, { type: 'GOOD' })
    state = counterReducer(state, { type: 'GOOD' })
    state = counterReducer(state, { type: 'NEUTRAL' })
    const finalState = counterReducer(state, { type: 'BAD' })
    deepFreeze(state)

    expect(finalState).toEqual({
      good: 2,
      neutral: 1,
      bad: 1
    })
  })
})