import React, { Component } from 'react'
import './Plate.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down'
import Sound from '../../utils/Sound.js'


class Plate extends Component {
  constructor() {
    super()
    this.state = {
      scrambledText: '',
      plateHeight: {},
      synth1IsPlaying: false,
    }
    this.plateRef = null
    this.realText = `I'm a web developer with a background including construction, oil rigs, and university. I've dabbled with making web pages since I was in high school, and I've recently decided on a career switch into what I have more passion for. I'm also an alumni of the Lighthouse Labs Web Dev Bootcamp in Vancouver.\n\nOther than coding, in my spare time I enjoy playing guitar and producing music.`
    this.chars = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`

    this.cssMinHeight = 192
    this.textThresholdOne = 200 // For text un-scrambling on the way in, and height should stop increasing here
    this.textThresholdTwo = 350 // For text scrambling on the way out

    this.synth1 = null
  }

  componentWillMount = () => {
    const { viewPosition } = this.props
    this.setState({
      plateHeight: { height: viewPosition + this.cssMinHeight},
    })

    this.instantiateSynth()
  }

  componentWillReceiveProps = (nextProps) => {
    const { viewPosition } = nextProps

    /*================
      Scrambled Text
    ================*/
    if (viewPosition < this.textThresholdOne || viewPosition > this.textThresholdTwo) {
      let scrambledText = ''
      const lenChars = this.chars.length
      this.realText.split('').forEach(letter => {
        if (letter === ' ' || letter === '\n') {
          // Keeps the spaces
          scrambledText += letter
        }
        else if (Math.random() > (viewPosition / this.textThresholdOne) && viewPosition < this.textThresholdOne) {
          /* First text scramble
            The 'if' evaluates as true less often as viewPosition increases, so causes scramble-amount to 'fade-out' */
          scrambledText += this.chars[Math.floor(Math.random() * lenChars)]
        }
        else if (Math.random() < ((viewPosition / this.textThresholdTwo) - 1) && viewPosition > this.textThresholdTwo) {
          /* Second text scramble
            The 'if' evaluates as true MORE often as viewPosition increases, when past 2nd viewPosition threshold */
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


    /*=====================
      Height of the plate
    =====================*/
    this.setState({
      plateHeight: { height: viewPosition + this.cssMinHeight},
      // Max height of plate is determined by height of Section One element in App.css
    })

    /* Edge case fix:
      Sets menu to full open if past textThreshold, because of bug with scrolling really fast */
    if (viewPosition >= this.textThresholdOne) {
      this.setState({
        plateHeight: { height: this.textThresholdOne + this.cssMinHeight },
      })
    }


    /*===============
      Sound effects
    ===============*/
    const { isScrolling, scrollRate } = this.props

    // To play the sound:
    if (isScrolling && !this.state.synth1IsPlaying) {
      this.setState({ synth1IsPlaying: true }, () => {
        this.synth1.play(viewPosition)
      })
    }

    // To change the pitch of sound, depending on viewPosition (later will change to view position change speed)
    this.synth1.frequency = scrollRate
  }

  componentDidUpdate = () => {
    const { isScrolling } = this.props

    // To stop the sound:
    if (!isScrolling && this.state.synth1IsPlaying) {
      this.setState({ synth1IsPlaying: false }, () => {
        this.synth1.stop()
        // Re-create the sound object as required by Web Audio API
        this.instantiateSynth()
      })
    }
  }

  instantiateSynth = () => {
    this.synth1 = new Sound(this.props.audioContext, 'square')
  }


  render = () => {
    return (
      <div className="plate no-select" style={this.state.plateHeight}>
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
            this.props.viewPosition < this.textThresholdTwo ?
              (this.props.viewPosition < this.textThresholdOne ? this.state.scrambledText : this.realText) :
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
    viewPosition: state.viewPosition,
    audioContext: state.audioContext,
    isScrolling: state.isScrolling,
    scrollRate: state.scrollRate,
  }
}

Plate = connect(mapStateToProps)(Plate)

export default Plate
