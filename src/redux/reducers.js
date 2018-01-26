import update from 'react-addons-update'

const initialState = {
  viewPosition: 0
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'MODIFY_VIEW_POSITION':
      const { valueChange } = action
      return update(state, {
        viewPosition: {$apply: (currentValue) => {
          let newValue = currentValue + valueChange
          if (newValue < 0) newValue = 0
          return newValue
        }}
      })

    default:
      return { ...state }
  }
}

export default reducers
