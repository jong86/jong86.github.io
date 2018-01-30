const initialState = {
  scrollPosition: 0,
  scrollRate: 0,
  isScrolling: false,
  audioContext: new (window.AudioContext || window.webkitAudioContext)(),
  scrollBreakpoints: [200, 600, 800, 900]
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
=> close skill menu and move it out of view (upwards) at the same time
breakPt[4]
=> move projects menu into view


*/