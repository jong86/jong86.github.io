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

export const moveComponentVertically = (startPct, endPct, breakPt1, breakPt2, scrollPos) => {
  const startInt = parseInt(startPct, 10)
  const endInt = parseInt(endPct, 10)
  const output = startInt - ((scrollPos - breakPt1) / (breakPt2 - breakPt1)) * (Math.abs(startInt - endInt))
  return output + '%'
}