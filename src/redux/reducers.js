import initialState from './initialState.js'

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCROLL_POSITION':
      const { scrollPosition } = action
      return {
        ...state,
        scrollPosition: scrollPosition,
      }

    case 'SET_IS_SCROLLING':
      const { boolean } = action
      return {
        ...state,
        isScrolling: boolean,
      }

    case 'SET_SCROLL_DIRECTION':
      const { direction } = action
      return {
        ...state,
        scrollDirection: direction,
      }

    default:
      return { ...state }
  }
}

export default reducers
