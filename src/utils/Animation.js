import { store } from '../redux/store.js'
const state = store.getState()

export const fadeOpacity = (direction, breakpoint1, breakpoint2) => {
  // Fades opacity in/out towards specified scrollPosition breakpoint
  const { scrollPosition } = state

  switch (direction) {
    case 'out':
      return 1 - ((((scrollPosition - breakpoint1) / (breakpoint2 - breakpoint1))) ** 2)
    case 'in':
      return (scrollPosition - breakpoint1) / (breakpoint2 - breakpoint1)
    default:
      return
  }
}
