import React, { Component } from 'react'
import './Education.css'
import { connect } from 'react-redux'
import {
  fadeOpacity,
  moveComponentVertically,
  decHeightWithScrollPosition,
  incHeightWithScrollPosition,
  decWidthWithScrollPosition,
  incWidthWithScrollPosition,
} from '../../utils/animation.js'

import AngleRight from 'react-icons/lib/fa/angle-right'
import AngleLeft from 'react-icons/lib/fa/angle-left'

import uuidv4 from 'uuid/v4'



class Education extends Component {
  constructor() {
    super()
    this.state = {
      wrapperStyle: {},
      sectionStyle: {},
      titleStyle: {},
      contentStyle: {},
    }

    this.initialWrapperHeight = '1px'
    this.initialSectionWidth = '1px'
    this.wrapperMaxHeight = '800px'
  }

  componentWillMount = () => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
    } = this.props

    this.setState({
      wrapperStyle: {
        top: '50%',
        opacity: 1.0,
        height: this.initialWrapperHeight,
      },
      sectionStyle: {
        width: this.initialSectionWidth,
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
    let breakPt1, breakPt2

    // Open Education component
    breakPt1 = breakPt[10]
    breakPt2 = breakPt[11]
    console.log('in here');
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          height: incHeightWithScrollPosition(this.wrapperMaxHeight, breakPt1, breakPt2, scrollPos)
        },
        sectionStyle: {
          ...this.state.sectionStyle,
          width: incWidthWithScrollPosition(breakPt1, breakPt2, scrollPos),
        },
        contentStyle: {
          opacity: fadeOpacity('in', breakPt1, breakPt2, scrollPos),
        },
        titleStyle: {
          opacity: fadeOpacity('in', breakPt1, breakPt2, scrollPos),
        },
      })
    }
  }


  render = () => {
    const { wrapperStyle, sectionStyle, titleStyle, contentStyle } = this.state
    const { scrollToBreakPoint } = this.props

    return (
      <div className="education-wrapper" style={wrapperStyle}>
        <div className="education no-select" style={sectionStyle}>
          <div className="heading" onClick={() => scrollToBreakPoint(3, 500)}>
            <div className="title" style={titleStyle}>
              EDUCATION
            </div>
          </div>
          <div className="content" style={contentStyle}>

            This is my education

            <div className="button-wrapper">
              <AngleLeft
                size={56}
                onClick={() => scrollToBreakPoint(13, 500)}
              />
            </div>
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

Education = connect(mapStateToProps)(Education)

export default Education
