const initialState = {
  scrollPosition: 0,
  scrollRate: 0,
  isScrolling: false,
  audioContext: new (window.AudioContext || window.webkitAudioContext)(),
  scrollBreakpoints: [225, 800, 1200, 1300]
}

export default initialState