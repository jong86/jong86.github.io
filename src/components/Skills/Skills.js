import React, { Component } from 'react'
import './Skills.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down'
import Sound from '../../utils/Sound.js'
import { fadeOpacity } from '../../utils/Animation.js'


class Skills extends Component {
  constructor() {
    super()
    this.state = {
      skillsStyle: {},
      titleStyle: {},
      textStyle: {},
    }

    this.synth = null
  }

  componentWillMount = () => {

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

    if (scrollPos > breakPt[2] && scrollPos <= breakPt[3])
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
          Teh skills
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
