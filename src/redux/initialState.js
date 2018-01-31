const initialState = {
  scrollPosition: 0,
  isScrolling: false,
  scrollBreakpoints: [200, 600, 1000, 1400, 1800, 2200, 2600]
}

export default initialState


/*
Animation progression:

0
=> open up summary menu
breakPt[0]
=> move summary menu out of view
breakPt[1]
=> move skills menu into view
breakPt[2]
=> open up skills menu
breakPt[3]
=> close skills menu vertically until it's a 1px line
breakPt[4]
=> hide skills menu, put projects menu in place (cyan color), starting at 1px and opening verticaly, so it looks like the same menu, just changed color
breakPt[5]

breakPt[6]



*/