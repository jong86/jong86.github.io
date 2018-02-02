import React, { Component } from 'react'
import './Menu.css'
import { connect } from 'react-redux'
import {
  fadeOpacity,
  moveComponentVertically,
  decHeightWithScrollPosition,
  incWidthWithScrollPosition,
} from '../../utils/animation.js'

import AngleRight from 'react-icons/lib/fa/angle-right'
import AngleLeft from 'react-icons/lib/fa/angle-left'

import uuidv4 from 'uuid/v4'

class Menu extends Component {
  render = () => {
    let {
      scrollToBreakPoint,
      title,
      renderContent,
      wrapperStyle,
      sectionStyle,
      titleStyle,
      contentStyle,
      sectionColor,
      breakPtPrev,
      breakPtNext,
    } = this.props


    // Set specifics:
    sectionStyle = {
      ...sectionStyle,
      border: `1px solid ${sectionColor}`
    }

    const headingStyle = {}
    headingStyle.borderBottom = `1px solid ${sectionColor}`


    return (
      <div className="wrapper" style={wrapperStyle}>
        <div className="menu no-select" style={sectionStyle}>
          <div className="heading" style={headingStyle}>
            <AngleLeft size={56} color={`${sectionColor}`} onClick={() => scrollToBreakPoint(breakPtPrev)}/>
            <div className="title" style={titleStyle}>
              { this.props.title }
            </div>
            <AngleRight size={56} color={`${sectionColor}`} onClick={() => scrollToBreakPoint(breakPtNext)}/>
          </div>
          <div className="content" style={contentStyle}>
            { this.props.renderContent }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    scrollBreakpoints: state.scrollBreakpoints,
  }
}

Menu = connect(mapStateToProps)(Menu)

export default Menu
