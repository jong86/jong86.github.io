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

    case 'SET_CURRENT_SECTION_PAGE':
      const { page } = action
      return {
        ...state,
        currentSectionPage: page,
      }

    default:
      return { ...state }
  }
}

export default reducers
