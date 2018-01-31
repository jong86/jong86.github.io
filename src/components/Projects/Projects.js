import React, { Component } from 'react'
import './Projects.css'
import { connect } from 'react-redux'
import { fadeOpacity, moveComponentVertically } from '../../utils/animation.js'

import uuidv4 from 'uuid/v4'



class Projects extends Component {
  constructor() {
    super()
    this.state = {
      wrapperStyle: {},
      sectionStyle: {},
      titleStyle: {},
      textStyle: {},
    }

    this.initialWrapperHeight = '1px'
    this.wrapperMaxHeight = '600px'
  }

  componentWillMount = () => {
    this.setState({
      wrapperStyle: {
        top: '50%',
        opacity: 1.0,
        height: this.initialWrapperHeight,
      },
      sectionStyle: {
        width: '100%',
      },
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
    // When expanding in height
    if (scrollPos > breakPt[4] && scrollPos <= breakPt[5]) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          height: this.incHeightWithScrollPosition(breakPt[4], breakPt[5]),
        },
        textStyle: {
          opacity: fadeOpacity('in', breakPt[4], breakPt[5], scrollPos),
        },
        titleStyle: {
          opacity: fadeOpacity('in', breakPt[4], breakPt[5], scrollPos),
        },
      })
    }
  }

  incHeightWithScrollPosition = (breakPt1, breakPt2) => {
    const { scrollPosition: scrollPos } = this.props
    const diff1 = scrollPos - breakPt1
    const diff2 = breakPt2 - breakPt1

    const output = (diff1 / diff2) * parseInt(this.wrapperMaxHeight)
    return output < 1 ? '1px' : output + 'px'
  }

  render = () => {
    const { wrapperStyle, sectionStyle, titleStyle, textStyle } = this.state

    return (
      <div className="projects-wrapper" style={wrapperStyle}>
        <div className="projects no-select" style={sectionStyle}>
          <div className="heading">
            <div className="title" style={titleStyle}>
              PROJECTS
            </div>
          </div>
          <div className="text" style={textStyle}>

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

Projects = connect(mapStateToProps)(Projects)

export default Projects
