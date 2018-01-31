const initialState = {
  scrollPosition: 0,
  isScrolling: false,
  scrollBreakpoints: [200, 600, 800, 1000, 1200, 1400, 1600]
}

export default initialState


/*
Animation progression:

0
=> open up summary menu
breakPt[0]
=> move summary menu out of view
breakPt[1]
=> move skill menu into view
breakPt[2]
=> open up skill menu
breakPt[3]
=> close skill menu horizontally again
breakPt[4]
=> close skill menu vertically to create a box
breakPt[5]
=> move skill menu to right, until off-screen
breakPt[6]



*/