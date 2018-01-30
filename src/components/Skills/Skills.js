import React, { Component } from 'react'
import './Skills.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down'
import Synth from '../../utils/Synth.js'
import { freqLowerMod } from '../../utils/soundMod.js'
import { fadeOpacity } from '../../utils/animation.js'


class Skills extends Component {
  constructor() {
    super()
    this.state = {
      skillsStyle: {},
      titleStyle: {},
      textStyle: {},
    }

    this.synthIsPlaying = false
    this.synth = null
  }

  componentWillMount = () => {
    this.instantiateSynth()
  }

  componentWillReceiveProps = () => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
      isScrolling,
      audioContext
    } = this.props

    if (scrollPos <= breakPt[2]) {
      this.setState({
        titleStyle: {
          opacity: 0.0,
        },
        textStyle: {
          opacity: 0.0,
        },
        skillsStyle: {
          width: '2px',
        },
      })
    }

    if (scrollPos > breakPt[2] && scrollPos <= breakPt[3]) {
      this.setState({
        skillsStyle: {
          width: this.setWidthWithScrollPosition(breakPt[2], breakPt[3])
        },
        textStyle: {
          opacity: fadeOpacity('in', breakPt[2], breakPt[3], scrollPos),
        },
        titleStyle: {
          opacity: fadeOpacity('in', breakPt[2], breakPt[3], scrollPos),
        },
      })
    }


    /*===============
      Sound effect
    ===============*/
    if (scrollPos > breakPt[1]) {
      const { isScrolling, scrollRate } = this.props

      // Pitch modulation:
      const freq = freqLowerMod(scrollPos)

      // To play the sound
      if (isScrolling && !this.synthIsPlaying) {
        this.synthIsPlaying = true
        this.synth.play(freq)
      }

      // To adjust sound frequency
      this.synth.frequency = freq
    }
  }

  componentDidUpdate = () => {
    const { isScrolling, scrollPosition: scrollPos, scrollBreakpoints: breakPt } = this.props

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
    this.synth = new Synth(this.props.audioContext, 'triangle', 600, 700)
  }


  setWidthWithScrollPosition = (breakPt1, breakPt2) => {
    const { scrollPosition: scrollPos} = this.props
    return (((scrollPos - breakPt1) / (breakPt2 - breakPt1)) * 100) + '%'
  }

  render = () => {
    return (
      <div className="skills no-select" style={this.state.skillsStyle}>
        <div className="heading">
          <div className="title" style={this.state.titleStyle}>
            SKILLS
          </div>
        </div>
        <div className="text" style={this.state.textStyle}>
          Languages: Javascript, Python, Ruby<br/>
          Front-End: React, React-Native, Redux, Vue, JQuery, CSS/SCSS<br/>
          Back-End: Node, Express, Ruby on Rails, SQL, MongoDB, Web Sockets<br/>
          Other: Photoshop, Google Maps API, Web Audio API<br/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    scrollPosition: state.scrollPosition,
    audioContext: state.audioContext,
    isScrolling: state.isScrolling,
    scrollRate: state.scrollRate,
    scrollBreakpoints: state.scrollBreakpoints,
  }
}

Skills = connect(mapStateToProps)(Skills)

export default Skills
