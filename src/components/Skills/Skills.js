import React, { Component } from 'react'
import './Skills.css'
import { connect } from 'react-redux'
import { fadeOpacity, moveComponentVertically } from '../../utils/animation.js'
import { skillsData } from './skillsData.js';

import uuidv4 from 'uuid/v4'



class Skills extends Component {
  constructor() {
    super()
    this.state = {
      wrapperStyle: {},
      sectionStyle: {},
      titleStyle: {},
      textStyle: {},
    }
    this.skillsData = skillsData
  }

  componentWillMount = () => {
    this.setState({
      wrapperStyle: {
        top: '125%',
        opacity: 0.0,
      }
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
    } = nextProps


    /*============
      Animation
    ============*/

    // Before coming into view
    if (scrollPos <= breakPt[1]) {
      // Style fix if scrolled too fast
      this.setState({
        wrapperStyle: {
          opacity: 0.0,
        }
      })
    }

    // Moving into view
    if (scrollPos > breakPt[1] && scrollPos <= breakPt[2]) {
      this.setState({
        wrapperStyle: {
          top: moveComponentVertically('125%', '50%', breakPt[1], breakPt[2], scrollPos),
          opacity: fadeOpacity('in', breakPt[1], breakPt[2], scrollPos),
        },
        sectionStyle: {
          width: '2px',
        },
        textStyle: {
          opacity: 0.0,
        },
      })
    }

    // When centered in view
    if (scrollPos > breakPt[2]) {
      // Style fix if scrolled too fast
      this.setState({
        wrapperStyle: {
          top: '50%',
          opacity: 1.0,
        }
      })
    }

    // When centered in view, and opening up
    if (scrollPos > breakPt[2] && scrollPos <= breakPt[3]) {
      this.setState({
        sectionStyle: {
          width: this.setWidthWithScrollPosition(breakPt[2], breakPt[3])
        },
        titleStyle: {
          opacity: fadeOpacity('in', breakPt[2], breakPt[3], scrollPos),
        },
        textStyle: {
          opacity: 0,
        },
      })
    }

    // When should be centered and fully opened
    if (scrollPos > breakPt[3]) {
      // Style fix if moved too fast
      this.setState({
        sectionStyle: {
          width: '100%',
        },
        titleStyle: {
          opacity: 1.0,
        },
      })
    }

    // Fade in text just before component's width maxes out
    if (scrollPos > breakPt[3] - 100 && scrollPos <= breakPt[3]) {
      this.setState({
        textStyle: {
          opacity: fadeOpacity('in', breakPt[3] - 100, breakPt[3], scrollPos),
        },
      })
    }
  }

  setWidthWithScrollPosition = (breakPt1, breakPt2) => {
    const { scrollPosition: scrollPos} = this.props
    return (((scrollPos - breakPt1) / (breakPt2 - breakPt1)) * 100) + '%'
  }

  render = () => {
    const { wrapperStyle, sectionStyle, titleStyle, textStyle } = this.state

    // console.log(this.skillsData)

    const renderSkills = this.skillsData.map((section, i) =>
      <div key={uuidv4()}>
        <div className="label" key={uuidv4()}>
          { section.label }
        </div>
        <ul className="list" key={uuidv4()}>
          { section.items.map((item, j) =>
            <li key={uuidv4()}>{ item }</li>
          )}
        </ul>
      </div>
    )

    return (
      <div className="skills-wrapper" style={wrapperStyle}>
        <div className="skills no-select" style={sectionStyle}>
          <div className="heading">
            <div className="title" style={titleStyle}>
              SKILLS
            </div>
          </div>
          <div className="text" style={textStyle}>
            { renderSkills }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    scrollPosition: state.scrollPosition,
    scrollBreakpoints: state.scrollBreakpoints,
  }
}

Skills = connect(mapStateToProps)(Skills)

export default Skills
