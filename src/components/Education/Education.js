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

import uuidv4 from 'uuid/v4'

import Menu from '../Menu/Menu.js'



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

    // Close Education component
    breakPt1 = breakPt[11]
    breakPt2 = breakPt[12]
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          height: decHeightWithScrollPosition(this.wrapperMaxHeight, breakPt1, breakPt2, scrollPos)
        },
        sectionStyle: {
          ...this.state.sectionStyle,
          width: decWidthWithScrollPosition(breakPt1, breakPt2, scrollPos),
        },
        contentStyle: {
          opacity: fadeOpacity('out', breakPt1, breakPt2, scrollPos),
        },
        titleStyle: {
          opacity: fadeOpacity('out', breakPt1, breakPt2, scrollPos),
        },
      })
    }
  }


  render = () => {
    const { wrapperStyle, sectionStyle, titleStyle, contentStyle } = this.state
    const { scrollToBreakPoint } = this.props

    const renderEducation = "education"

    return (
      <Menu
        title='Education'
        renderContent={renderEducation}
        wrapperStyle={wrapperStyle}
        sectionStyle={sectionStyle}
        titleStyle={titleStyle}
        contentStyle={contentStyle}
        scrollToBreakPoint={scrollToBreakPoint}
        sectionColor='yellow'
        breakPtPrev={9}
        breakPtNext={13}
      />
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
