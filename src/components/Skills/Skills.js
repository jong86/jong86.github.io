import React, { Component } from 'react'
import './Skills.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down'
import Sound from '../../utils/Sound.js'


class Skills extends Component {
  constructor() {
    super()
    this.state = {

    }
  }


  render = () => {
    return (
      <div className="skills no-select">
        This is skills.
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
  }
}

Skills = connect(mapStateToProps)(Skills)

export default Skills
