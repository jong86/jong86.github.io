import initialState from './initialState.js'
import update from 'immutability-helper'

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCROLL_POSITION':
      const { scrollPosition } = action
      return update(state, {
        scrollPosition: { $set: scrollPosition }
      })

    case 'SET_IS_SCROLLING':
      const { boolean } = action
      return update(state, {
        isScrolling: { $set: boolean }
      })

    case 'SET_SCROLL_RATE':
      const { scrollRate } = action
      return update(state, {
        scrollRate: { $set: scrollRate }
      })

    default:
      return { ...state }
  }
}

export default reducers
