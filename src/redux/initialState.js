const initialState = {
  viewPosition: 0,
  isScrolling: false,
  audioContext: new (window.AudioContext || window.webkitAudioContext)(),
  scrollRate: 0,
}

export default initialState