const initialState = {
  scrollPosition: 0,
  isScrolling: false,
  scrollBreakpoints: [
    200, // 0
    600, // 1
    1000, // 2
    1400, // 3
    1800, // 4
    2200, // 5
    2600, // 6
    3000, // 7
    3400, // 8
    3800, // 9
    4200, // 10
    4600, // 11
    5000, // 12
    5400, // 13
    5800, // 14
    6200, // 15
  ]
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