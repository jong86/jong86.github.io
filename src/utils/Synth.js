export default class Synth {
  constructor(context, waveshape, lowpassFreq, hipassFreq) {
    this.context = context
    this.waveshape = waveshape
    this.lowpassFreq = lowpassFreq
    this.hipassFreq = hipassFreq

    this.oscillator = this.context.createOscillator()
    this.gainNode = this.context.createGain()
    this.filterLowPass = this.context.createBiquadFilter()
    this.filterHiPass = this.context.createBiquadFilter()

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
    this.filterLowPass.frequency.value = this.lowpassFreq

    this.filterHiPass.type = 'highpass'
    this.filterHiPass.frequency.value = this.hipassFreq

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