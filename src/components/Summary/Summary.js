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
      displayedText: '',
      summaryHeight: {},
    }
    this.realText = `I'm a web developer with a background including construction, oil rigs, and university. I've dabbled with making web pages since I was in high school, and I've recently decided on a career switch into what I have more passion for. I'm also an alumni of the Lighthouse Labs Web Dev Bootcamp in Vancouver.\n\nOther than coding, in my spare time I enjoy playing guitar and producing music.`
    this.chars = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`

    this.cssMinHeight = 192

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
    const { scrollPosition: scrollPos, isScrolling, scrollBreakpoints: breakPt } = nextProps

    /*================
      Scrambled Text
    ================*/
    if (scrollPos <= breakPt[0] || scrollPos > breakPt[0] + 150) {
      let scrambledText = ''
      const lenChars = this.chars.length
      this.realText.split('').forEach(letter => {
        if (letter === ' ' || letter === '\n') {
          // Keeps the spaces
          scrambledText += letter
        }
        else if (Math.random() > (scrollPos /  breakPt[0]) && scrollPos < breakPt[0]) {
          // Text de-scrambling on the way in:
          // The 'if' evaluates as true less often as scrollPos increases, so causes scramble amount to 'fade-out'
          scrambledText += this.chars[Math.floor(Math.random() * lenChars)]
        }
        else if (Math.random() < ((scrollPos / breakPt[0] + 150) - 1) && scrollPos > breakPt[0] + 150) {
          // Text re-scrambling on the way out:
          // The 'if' evaluates as true MORE often as scrollPos increases, when past 2nd scrollPos breakpoint
          scrambledText += this.chars[Math.floor(Math.random() * lenChars)]
        }
        else {
          scrambledText += letter
        }
      })

      this.setState({
        displayedText: scrambledText,
      })
    }

    if (scrollPos > breakPt[0] && scrollPos <= breakPt[0] + 150) {
      this.setState({
        displayedText: this.realText,
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
    // Sets menu to full open if past textBreakpoint, because of bug with scrolling really fast
    if (scrollPos >= breakPt[0]) {
      this.setState({
        summaryHeight: { height: breakPt[0] + this.cssMinHeight },
      })
    }


    /*===============
      Sound effect
    ===============*/

    // Adjust function for before / after breakPts
    let direction, breakPt1, breakPt2
    if (scrollPos <= breakPt[0]) {
      direction = 'down'
      breakPt1 = 0
      breakPt2 = breakPt[0]
    } else if (scrollPos > breakPt[0]) {
      direction = 'up'
      breakPt1 = breakPt[0]
      breakPt2 = breakPt[1]
    }

    // Pitch modulation:
    const freq = freqExp(direction, breakPt1, breakPt2, 22050, 0, scrollPos)

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
    this.synth = new Synth(this.props.audioContext, 'triangle', 900, 400)
  }


  render = () => {
    const { displayedText } = this.state

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
          { displayedText }
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
    scrollBreakpoints: state.scrollBreakpoints
  }
}

Summary = connect(mapStateToProps)(Summary)

export default Summary
