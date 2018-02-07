import React, { Component } from 'react'
import './Menu.css'
import action from '../../redux/action.js'
import { connect } from 'react-redux'
import {
  fadeOpacity,
  moveComponentVerticallyUp,
  incWidthWithScrollPosition,
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
  }

  componentWillMount = () => {
    const {
      sectionColor,
      breakPt1,
      breakPt4,
      scrollPosition: scrollPos,
      isScrolling
    } = this.props

    if (scrollPos <= breakPt1) {
      this.setState({
        wrapperStyle: {
          marginTop: '125%',
          opacity: 0.0,
        },
        sectionStyle: {
          borderColor: sectionColor
        },
        headingStyle: {
          borderColor: sectionColor
        },
      })
    } else if (scrollPos > breakPt4) {
      this.setState({
        wrapperStyle: {
          opacity: 1.0,
        },
        sectionStyle: {
          width: '100%',
        },
      })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      scrollPosition: scrollPos,
    } = nextProps


    /*============
      Animation
    ============*/
    let { breakPt1, breakPt2, breakPt3, breakPt4, breakPt5 } = this.props

    // Moving into view
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          marginTop: moveComponentVerticallyUp('125%', '0%', breakPt1, breakPt2, scrollPos),
          opacity: fadeOpacity('in', breakPt1, breakPt2, scrollPos),
        },
        sectionStyle: {
          ...this.state.sectionStyle,
          width: '2px',
        },
        contentStyle: {
          ...this.state.contentStyle,
          opacity: 0.0,
        },
      })
    }

    // When centered in view, and opening up
    if (scrollPos > breakPt2 && scrollPos <= breakPt3) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          marginTop: '0%',
        },
        sectionStyle: {
          ...this.state.sectionStyle,
          width: incWidthWithScrollPosition(breakPt2, breakPt3, scrollPos)
        },
        titleStyle: {
          ...this.state.titleStyle,
          opacity: fadeOpacity('in', breakPt2, breakPt3, scrollPos),
        },
        contentStyle: {
          ...this.state.contentStyle,
          opacity: 0,
        },
      })
    }

    // Moving up, out of view
    if (scrollPos > breakPt3 && scrollPos <= breakPt4) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          marginTop: moveComponentVerticallyUp('0%', '-125%', breakPt3, breakPt4, scrollPos),
          opacity: fadeOpacity('out', breakPt3, breakPt4, scrollPos),
        },
        sectionStyle: {
          ...this.state.sectionStyle,
          width: '100%',
        },
      })
    }
  }

  onClickPrev = () => {
    const {
      scrollToBreakPoint,
      scrollPosition: scrollPos,
    } = this.props
    scrollToBreakPoint(scrollPos - 1200)
  }

  onClickNext = () => {
    const {
      scrollToBreakPoint,
      scrollPosition: scrollPos,
    } = this.props
    scrollToBreakPoint(scrollPos + 1200)
  }


  render = () => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
      scrollToBreakPoint,
      title,
      renderContent,
      sectionColor,
      hasPages,
      currentPage
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
        <div className="section no-select" style={sectionStyle}>
          <div className="heading" style={headingStyle}>
            <AngleLeft size={56} color={sectionColor} onClick={this.onClickPrev}/>
            <div className="title" style={titleStyle}>
              { title }
            </div>
            { scrollPos < 4200 && (<AngleRight size={56} color={sectionColor} onClick={this.onClickNext}/>) }
          </div>
          <div className="content" style={contentStyle}>
            { renderContent() }
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
