export default class Sound {
  constructor(context, waveshape) {
    this.context = context
    this.oscillator = this.context.createOscillator()
    this.gainNode = this.context.createGain()
    this.waveshape = waveshape
    this.isPlaying = false
  }

  set frequency(value) {
    this.oscillator.frequency.value = value
  }

  init() {
    this.oscillator.connect(this.gainNode)
    this.gainNode.connect(this.context.destination)

    this.oscillator.type = this.waveshape

    this.isPlaying = false
  }

  play(freq) {
    this.init()

    this.oscillator.frequency.value = freq

    console.log("starting osc")
    this.oscillator.start()
    this.isPlaying = true
  }

  stop() {
    console.log("stopping osc")
    gainNode.gain.setTargetAtTime(0, context.currentTime, 0.015)
    this.oscillator.stop()
    this.isPlaying = false
  }
}