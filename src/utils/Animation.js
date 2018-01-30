export const fadeOpacity = (direction, breakPt1, breakPt2, scrollPos) => {
  // Fades opacity in/out towards specified scrollPosition breakpoint
  switch (direction) {
    case 'out':
      return 1 - ((((scrollPos - breakPt1) / (breakPt2 - breakPt1))) ** 2)
    case 'in':
      return (scrollPos - breakPt1) / (breakPt2 - breakPt1)
    default:
      return
  }
}
