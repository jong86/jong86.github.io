export default class Synth {
  constructor(context, waveshape) {
    this.context = context
    this.oscillator = this.context.createOscillator()
    this.gainNode = this.context.createGain()
    this.filterLowPass = this.context.createBiquadFilter()
    this.filterHiPass = this.context.createBiquadFilter()
    this.waveshape = waveshape
    this.isPlaying = false
  }

  set frequency(value) {
    this.oscillator.frequency.value = value
  }

  init() {
    this.oscillator.connect(this.filterLowPass)
    this.filterLowPass.connect(this.filterHiPass)
    this.filterHiPass.connect(this.gainNode)
    this.gainNode.connect(this.context.destination)

    this.oscillator.type = this.waveshape

    this.filterLowPass.type = 'lowpass'
    this.filterLowPass.frequency.value = 900

    this.filterHiPass.type = 'highpass'
    this.filterHiPass.frequency.value = 400

    this.isPlaying = false
  }

  play(freq) {
    this.init()

    this.oscillator.frequency.value = freq

    this.gainNode.gain.value = 0
    this.oscillator.start()
    this.gainNode.gain.setTargetAtTime(0.2, this.context.currentTime, 0.015)
    this.isPlaying = true
  }

  stop() {
    this.gainNode.gain.setTargetAtTime(0, this.context.currentTime, 0.015)
    this.isPlaying = false
  }
}