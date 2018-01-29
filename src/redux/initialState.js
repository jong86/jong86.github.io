const initialState = {
  viewPosition: 0,
  isScrolling: false,
  audioContext: new (window.AudioContext || window.webkitAudioContext)()
}

export default initialState