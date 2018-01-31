import React, { Component } from 'react'
import './Skills.css'
import { connect } from 'react-redux'
import {
  fadeOpacity,
  moveComponentVertically,
  decHeightWithScrollPosition,
  incWidthWithScrollPosition,
} from '../../utils/animation.js'
import { skillsData } from './skillsData.js'

import AngleDown from 'react-icons/lib/fa/angle-down'

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

    this.initialWrapperHeight = '600px'
    this.wrapperMinHeight = '1px'
  }

  componentWillMount = () => {
    this.setState({
      wrapperStyle: {
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
          top: '125%',
          height: this.initialWrapperHeight,
          minHeight: this.wrapperMinHeight,
          opacity: 0.0,
        }
      })
    }

    // Moving into view
    if (scrollPos > breakPt[1] && scrollPos <= breakPt[2]) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
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
          ...this.state.wrapperStyle,
          top: '50%',
          opacity: 1.0,
        }
      })
    }

    // When centered in view, and opening up
    if (scrollPos > breakPt[2] && scrollPos <= breakPt[3]) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          height: this.initialWrapperHeight,
          top: '50%',
        },
        sectionStyle: {
          width: incWidthWithScrollPosition(breakPt[2], breakPt[3], scrollPos)
        },
        titleStyle: {
          opacity: fadeOpacity('in', breakPt[2], breakPt[3], scrollPos),
        },
        textStyle: {
          opacity: 0,
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

    // When should be centered and fully opened
    if (scrollPos > breakPt[3] && scrollPos <= breakPt[3] + 1)  {
      // Style fix if moved too fast
      this.setState({
        sectionStyle: {
          width: '100%',
        },
        textStyle: {
          opacity: 1.0,
        },
      })
    }

    // When shrinking in height
    if (scrollPos > breakPt[3] && scrollPos <= breakPt[4]) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          opacity: 1.0,
          top: '50%',
          height: decHeightWithScrollPosition(this.initialWrapperHeight, breakPt[3], breakPt[4], scrollPos),
        },
        sectionStyle: {
          width: '100%',
        },
        textStyle: {
          opacity: fadeOpacity('out', breakPt[3], breakPt[4] - 100, scrollPos),
        },
        titleStyle: {
          opacity: fadeOpacity('out', breakPt[3], breakPt[4] - 100, scrollPos),
        },
      })
    }

    if (scrollPos > breakPt[4]) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          height: this.wrapperMinHeight,
        }
      })
    }
  }


  render = () => {
    const { wrapperStyle, sectionStyle, titleStyle, textStyle } = this.state
    const {
      scrollToBreakPoint,
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt
    } = this.props

    const renderSkills = this.skillsData.map(section =>
      <div key={uuidv4()}>
        <div className="label" key={uuidv4()}>
          { section.label }
        </div>
        <ul className="list" key={uuidv4()}>
          { section.items.map(item =>
            <li key={uuidv4()}>{ item }</li>
          )}
        </ul>
      </div>
    )

    return (
      <div className="skills-wrapper" style={wrapperStyle}>
        <div className="skills no-select" style={sectionStyle}>
          <div className="heading" onClick={() => scrollToBreakPoint(0, 500)}>
            <div className="title" style={titleStyle}>
              SKILLS
            </div>
          </div>
          <div className="text" style={textStyle}>
            { renderSkills }
            { scrollPos <= breakPt[3] + 10 && <AngleDown size={56} onClick={() => scrollToBreakPoint(5, 500)}/>}
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
