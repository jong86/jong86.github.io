import React, { Component } from 'react'
import './Skills.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down'
import Sound from '../../utils/Sound.js'


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
      scrollBreakpoints: bp,
      isScrolling,
      audioContext
    } = this.props

    if (scrollPos <= bp[2]) {
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

    if (scrollPos > bp[2] && scrollPos <= bp[3])
      this.setState({
        skillsStyle: {
          width: this.setWidthWithScrollPosition(bp[2], bp[3])
        }
      })
  }

  setWidthWithScrollPosition = (bp1, bp2) => {
    const { scrollPosition: scrollPos} = this.props
    return (((scrollPos - bp1) / (bp2 - bp1)) * 100) + '%'
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
