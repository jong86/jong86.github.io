const initialState = {
  scrollPosition: 0,
  isScrolling: false,
  audioContext: new (window.AudioContext || window.webkitAudioContext)(),
  scrollRate: 0,
}

export default initialState