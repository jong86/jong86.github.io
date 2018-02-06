import React, { Component } from 'react'
import './Menu.css'
import { connect } from 'react-redux'
import {
  fadeOpacity,
  moveComponentVerticallyUp,
  moveComponentVerticallyDown,
  incHeightWithScrollPosition,
  decHeightWithScrollPosition,
  incWidthWithScrollPosition,
  decWidthWithScrollPosition,
} from '../../utils/animation.js'

import AngleRight from 'react-icons/lib/fa/angle-right'
import AngleLeft from 'react-icons/lib/fa/angle-left'

import uuidv4 from 'uuid/v4'


class Menu extends Component {
  constructor() {
    super()
    this.state = {
      wrapperStyle: {},
      sectionStyle: {},
      titleStyle: {},
      contentStyle: {},
      headingStyle: {},
    }

    this.initialWrapperHeight = '600px'
    this.wrapperMinHeight = '1px'
  }

  componentWillMount = () => {
    const { sectionColor} = this.props

    this.setState({
      wrapperStyle: {
        opacity: 0.0,
      },
      sectionStyle: {
        border: `1px solid ${sectionColor}`
      },
      headingStyle: {
        border: `1px solid ${sectionColor}`
      }
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      scrollPosition: scrollPos,
    } = nextProps


    /*============
      Animation
    ============*/
    const { breakPt1, breakPt2, breakPt3, breakPt4, breakPt5 } = this.props

    // Make sure it's out of view before it comes
    if (scrollPos <= breakPt1) {
      // Style fix if scrolled too fast
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          marginTop: '125%',
          height: this.initialWrapperHeight,
          minHeight: this.wrapperMinHeight,
          opacity: 0.0,
        }
      })
    }

    // Moving into view
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          marginTop: moveComponentVerticallyUp('125%', '0%', breakPt1, breakPt2, scrollPos),
          opacity: fadeOpacity('in', breakPt1, breakPt2, scrollPos),
        },
        sectionStyle: {
          width: '2px',
        },
        contentStyle: {
          opacity: 0.0,
        },
      })
    }

    // When centered in view
    if (scrollPos > breakPt2) {
      // Style fix if scrolled too fast
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          marginTop: '0%',
          opacity: 1.0,
        }
      })
    }

    // When centered in view, and opening up
    if (scrollPos > breakPt2 && scrollPos <= breakPt3) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          height: this.initialWrapperHeight,
          marginTop: '0%',
        },
        sectionStyle: {
          width: incWidthWithScrollPosition(breakPt2, breakPt3, scrollPos)
        },
        titleStyle: {
          opacity: fadeOpacity('in', breakPt2, breakPt3, scrollPos),
        },
        contentStyle: {
          opacity: 0,
        },
      })
    }

    // Fade in content just before component's width maxes out
    if (scrollPos > breakPt3 - 100 && scrollPos <= breakPt3) {
      this.setState({
        contentStyle: {
          opacity: fadeOpacity('in', breakPt3 - 100, breakPt3, scrollPos),
        },
      })
    }

    // When should be centered and fully opened
    if (scrollPos > breakPt3 && scrollPos <= breakPt3 + 1)  {
      // Style fix if moved too fast
      this.setState({
        sectionStyle: {
          width: '100%',
        },
        contentStyle: {
          opacity: 1.0,
        },
      })
    }

    // When shrinking in width
    if (scrollPos > breakPt3 && scrollPos <= breakPt4) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          opacity: 1.0,
          marginTop: '0%',
        },
        sectionStyle: {
          width: decWidthWithScrollPosition(breakPt3, breakPt4, scrollPos),
        },
        contentStyle: {
          opacity: fadeOpacity('out', breakPt3, breakPt4 - 100, scrollPos),
        },
        titleStyle: {
          opacity: fadeOpacity('out', breakPt3, breakPt4 - 100, scrollPos),
        },
      })
    }

    // Moving out of view
    if (scrollPos > breakPt4 && scrollPos <= breakPt5) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          marginTop: moveComponentVerticallyDown('0%', '125%', breakPt4, breakPt5, scrollPos),
          opacity: fadeOpacity('in', breakPt4, breakPt5, scrollPos),
        },
        sectionStyle: {
          width: "2px",
        },
      })
    }
  }


  render = () => {
    const {
      scrollToBreakPoint,
      title,
      renderContent,
      sectionColor,
      breakPtPrev,
      breakPtNext,
    } = this.props

    const {
      wrapperStyle,
      sectionStyle,
      headingStyle,
      titleStyle,
      contentStyle,
    } = this.state

    return (
      <div className="wrapper" style={wrapperStyle}>
        <div className="menu no-select" style={sectionStyle}>
          <div className="heading" style={headingStyle}>
            <AngleLeft size={56} color={`${sectionColor}`} onClick={() => scrollToBreakPoint(breakPtPrev)}/>
            <div className="title" style={titleStyle}>
              { title }
            </div>
            <AngleRight size={56} color={`${sectionColor}`} onClick={() => scrollToBreakPoint(breakPtNext)}/>
          </div>
          <div className="content" style={contentStyle}>
            { renderContent }
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

Menu = connect(mapStateToProps)(Menu)

export default Menu
