export default class Sound {
  constructor(context, waveshape) {
    this.context = context
    this.waveshape = waveshape
  }

  init() {
    this.oscillator = this.context.createOscillator()
    this.gainNode = this.context.createGain()

    this.oscillator.connect(this.gainNode)
    this.gainNode.connect(this.context.destination)

    this.oscillator.type = this.waveshape

    this.isPlaying = false
  }

  play(freq, time) {
    this.init()

    this.oscillator.frequency.value = freq

    console.log("starting osc")
    this.oscillator.start()
    this.isPlaying = true
  }

  stop() {
    console.log("stopping osc")
    this.oscillator.stop()
    this.isPlaying = false
  }
}