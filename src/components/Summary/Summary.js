import React, { Component } from 'react'
import './Summary.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down'
import Synth from '../../utils/Synth.js'
import { freqExp } from '../../utils/soundMod.js'


class Summary extends Component {
  constructor() {
    super()
    this.state = {
      scrambledText: '',
      summaryHeight: {},
    }
    this.realText = `I'm a web developer with a background including construction, oil rigs, and university. I've dabbled with making web pages since I was in high school, and I've recently decided on a career switch into what I have more passion for. I'm also an alumni of the Lighthouse Labs Web Dev Bootcamp in Vancouver.\n\nOther than coding, in my spare time I enjoy playing guitar and producing music.`
    this.chars = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`

    this.cssMinHeight = 192
    this.textBreakpoints = [200, 350] // For text un-scramble / scramble

    this.synth = null
    this.synthIsPlaying = false
  }

  componentWillMount = () => {
    const { scrollPosition: scrollPos } = this.props
    this.setState({
      summaryHeight: { height: scrollPos + this.cssMinHeight},
    })

    this.instantiateSynth()
  }

  componentWillReceiveProps = (nextProps) => {
    const { scrollPosition: scrollPos } = nextProps
    const { textBreakpoints: txtBreakPt } = this

    /*================
      Scrambled Text
    ================*/
    if (scrollPos < txtBreakPt[0] || scrollPos > txtBreakPt[1]) {
      let scrambledText = ''
      const lenChars = this.chars.length
      this.realText.split('').forEach(letter => {
        if (letter === ' ' || letter === '\n') {
          // Keeps the spaces
          scrambledText += letter
        }
        else if (Math.random() > (scrollPos / txtBreakPt[0]) && scrollPos < txtBreakPt[0]) {
          // Text de-scrambling on the way in:
          // The 'if' evaluates as true less often as scrollPos increases, so causes scramble amount to 'fade-out'
          scrambledText += this.chars[Math.floor(Math.random() * lenChars)]
        }
        else if (Math.random() < ((scrollPos / txtBreakPt[1]) - 1) && scrollPos > txtBreakPt[1]) {
          // Text re-scrambling on the way out:
          // The 'if' evaluates as true MORE often as scrollPos increases, when past 2nd scrollPos breakpoint
          scrambledText += this.chars[Math.floor(Math.random() * lenChars)]
        }
        else {
          scrambledText += letter
        }
      })

      this.setState({
        scrambledText: scrambledText,
      })
    }


    /*================
      Height change
    ================*/
    this.setState({
      summaryHeight: { height: scrollPos + this.cssMinHeight},
      // Max height of summary is determined by height of Section One element in App.css
    })

    // Edge case fix
    // Sets menu to full open if past textBreakpoint, because of bug with scrolling really fast */
    if (scrollPos >= txtBreakPt[0]) {
      this.setState({
        summaryHeight: { height: txtBreakPt[0] + this.cssMinHeight },
      })
    }


    /*===============
      Sound effect
    ===============*/
    const { isScrolling, scrollRate } = this.props

    // Adjust speed of rise before/after breakPt
    const freqDivisor = scrollPos < txtBreakPt[0] ? 5 : 25

    // Pitch modulation:
    const freq = freqExp(txtBreakPt[0], freqDivisor, scrollPos)

    // To play the sound
    if (isScrolling && !this.synthIsPlaying) {
      this.synthIsPlaying = true
      this.synth.play(freq)
    }

    // To adjust sound frequency
    this.synth.frequency = freq
  }


  componentDidUpdate = () => {
    const { isScrolling } = this.props

    // To stop the sound:
    if (!isScrolling && this.synthIsPlaying) {
      this.synthIsPlaying = false
      this.synth.stop()
      // Re-create the sound object as required by Web Audio API
      this.instantiateSynth()
    }
  }

  componentWillUnmount = () => {
    this.synth.stop()
  }

  instantiateSynth = () => {
    // This needs to happen to replay sound
    this.synth = new Synth(this.props.audioContext, 'sawtooth', 900, 400)
  }


  render = () => {
    const { textBreakpoints: txtBreakPt } = this

    return (
      <div className="summary no-select" style={this.state.summaryHeight}>
        <div className="heading">
          <div className="name">
            Jon Gaspar
          </div>
          <div className="title">
            WEB DEVELOPER
          </div>
        </div>
        <div className="text">
          {
            this.props.scrollPos < txtBreakPt[1] ?
              // Text de-scrambling on the way in:
              (this.props.scrollPos < txtBreakPt[0] ? this.state.scrambledText : this.realText) :
              // Text re-scrambling on the way out:
              (this.state.scrambledText)
          }
        </div>
        <AngleDown size={48}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    scrollPosition: state.scrollPosition,
    audioContext: state.audioContext,
    isScrolling: state.isScrolling,
    scrollRate: state.scrollRate,
  }
}

Summary = connect(mapStateToProps)(Summary)

export default Summary
