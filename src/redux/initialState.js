function makeInitialState() {

  // Generate breakpoints
  const scrollBreakpoints = []
  for (let i = 0; i < 30; i++) {
    scrollBreakpoints.push(200 + (i * 400))
  }

  return {
    scrollPosition: 0,
    isScrolling: false,
    scrollBreakpoints: scrollBreakpoints,
  }
}

export default makeInitialState()
