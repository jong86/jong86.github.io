import update from 'react-addons-update'

const initialState = {
  viewPosition: 0,
  lastViewPosition: 0,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIEW_POSITION':
      const { viewPosition } = action
      return update(state, {
        viewPosition: { $set: viewPosition }
      })

    case 'SET_LAST_VIEW_POSITION':
      const { lastViewPosition } = action
      return update(state, {
        lastViewPosition: { $set: lastViewPosition }
      })

    default:
      return { ...state }
  }
}

export default reducers
