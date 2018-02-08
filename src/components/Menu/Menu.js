import React, { Component } from 'react'
import './Menu.css'
import { connect } from 'react-redux'
import {
  fadeOpacity,
  moveComponentVerticallyUp,
  incWidthWithScrollPosition,
} from '../../utils/animation.js'

import AngleRight from 'react-icons/lib/fa/angle-right'
import AngleLeft from 'react-icons/lib/fa/angle-left'


class Menu extends Component {
  constructor(props) {
    super(props)

    const {
      breakPt2,
      breakPt4,
      scrollPosition: scrollPos,
    } = props

    this.state = {
      wrapperStyle: {
        transform: `translateY(${scrollPos <= breakPt2 ? '125%' : '-125%'}) scaleX(0.01)`,
        opacity: scrollPos <= breakPt2 ? 0.0 : 1.0,
      },
      titleStyle: {},
      contentStyle: {},
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      scrollPosition: scrollPos,
    } = nextProps


    /*============
      Animation
    ============*/
    let { breakPt1, breakPt2, breakPt3, breakPt4 } = this.props


    // Moving into view
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          transform: `translateY(${moveComponentVerticallyUp('125%', '0%', breakPt1, breakPt2, scrollPos)})  scaleX(0.01)`,
          opacity: fadeOpacity('in', breakPt1, breakPt2, scrollPos),
        },
        titleStyle: {
          ...this.state.titleStyle,
          opacity: 0.0,
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
          transform: `translateY(0) scaleX(${incWidthWithScrollPosition(breakPt2, breakPt3, scrollPos)})`,
        },
        titleStyle: {
          ...this.state.titleStyle,
          opacity: fadeOpacity('in', breakPt2, breakPt3, scrollPos),
        },
        contentStyle: {
          ...this.state.contentStyle,
          opacity: fadeOpacity('in', breakPt2, breakPt3, scrollPos),
        },
      })
    }

    // Check to make sure proper state when section displayed
    if (scrollPos === breakPt3) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          opacity: 1.0,
          transform: `translateY(0) scaleX(1)`,
        },
        titleStyle: {
          ...this.state.titleStyle,
          opacity: 1.0,
        },
        contentStyle: {
          ...this.state.contentStyle,
          opacity: 1.0,
        },
      })
    }

    // Moving up, out of view
    if (scrollPos > breakPt3 && scrollPos <= breakPt4) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          transform: `translateY(${moveComponentVerticallyUp('0%', '-125%', breakPt3, breakPt4, scrollPos)}) scaleX(1)`,
          opacity: fadeOpacity('out', breakPt3, breakPt4, scrollPos),
        },
        titleStyle: {
          ...this.state.titleStyle,
          opacity: fadeOpacity('out', breakPt3, breakPt4 - 100, scrollPos),
        },
        contentStyle: {
          ...this.state.contentStyle,
          opacity: fadeOpacity('out', breakPt3, breakPt4 - 100, scrollPos),
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
      title,
      renderContent,
      sectionColor,
    } = this.props

    const {
      wrapperStyle,
      sectionStyle,
      titleStyle,
      contentStyle,
    } = this.state

    return (
      <div className="wrapper no-select" style={{...wrapperStyle, borderColor: sectionColor}}>
        <div className="heading" style={{borderColor: sectionColor}}>
          <AngleLeft className="nav" size={56} color={sectionColor} onClick={this.onClickPrev}/>
          <div className="title" style={{...titleStyle, color: sectionColor}}>
            { title }
          </div>
          <AngleRight className="nav" size={56} color={sectionColor} onClick={this.onClickNext} style={{visibility: scrollPos <= 4200 ? 'visible' : 'hidden'}}/>
        </div>
        <div className="content" style={contentStyle}>
          { renderContent() }
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
