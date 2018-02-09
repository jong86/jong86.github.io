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
        transform: `translateY(${scrollPos <= breakPt2 ? '1250%' : '-1250%'})`,
        opacity: scrollPos <= breakPt2 ? 0.0 : 1.0,
      },
      sectionStyle: {
        width: scrollPos > breakPt4 ? '100%' : '1%',
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
          transform: `translateY(${moveComponentVerticallyUp('1250%', '0%', breakPt1, breakPt2, scrollPos)}) rotate(0.01deg)`,
          opacity: fadeOpacity('in', breakPt1, breakPt2, scrollPos),
        },
        sectionStyle: {
          ...this.state.sectionStyle,
          width: '1%',
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
          transform: `translateY(0) rotate(0.01deg)`,
        },
        sectionStyle: {
          ...this.state.sectionStyle,
          width: incWidthWithScrollPosition(breakPt2, breakPt3, scrollPos),
          transform: 'rotate(0.01deg)',
        },
        titleStyle: {
          ...this.state.titleStyle,
          opacity: fadeOpacity('in', breakPt2 + 300, breakPt3, scrollPos),
        },
        contentStyle: {
          ...this.state.contentStyle,
          opacity: fadeOpacity('in', breakPt2 + 300, breakPt3, scrollPos),
        },
      })
    }

    // Check to make sure proper state when section displayed
    if (scrollPos === breakPt3) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          opacity: 1.0,
          transform: `translateY(0) scaleX(1) rotate(0deg)`,
        },
        sectionStyle: {
          ...this.state.sectionStyle,
          opacity: 1.0,
          transform: 'rotate(0.0deg)',
          width: '100%',
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
          transform: `translateY(${moveComponentVerticallyUp('0%', '-1250%', breakPt3, breakPt4, scrollPos)}) rotate(0.01deg)`,
          opacity: fadeOpacity('out', breakPt3, breakPt4 - 100, scrollPos),
        },
        sectionStyle: {
          ...this.state.sectionStyle,
          width: '100%',
        },
        titleStyle: {
          ...this.state.titleStyle,
          opacity: fadeOpacity('out', breakPt3, breakPt4 - 100, scrollPos),
        },
        contentStyle: {
          ...this.state.contentStyle,
          opacity: fadeOpacity('out', breakPt3, breakPt4 - 300, scrollPos),
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
      isScrolling,
    } = this.props

    const {
      wrapperStyle,
      sectionStyle,
      titleStyle,
      contentStyle,
    } = this.state

    return (
      <div className="wrapper" style={wrapperStyle}>
        <div className="section no-select" style={{...sectionStyle, borderColor: sectionColor}}>
          <div className="heading" style={{borderColor: sectionColor}}>
            <AngleLeft className="nav" size={56} color={sectionColor} onClick={this.onClickPrev}/>
            <div className="title" style={{...titleStyle, color: sectionColor}}>
              { title }
            </div>
            <AngleRight className="nav" size={56} color={sectionColor} onClick={this.onClickNext} style={{visibility: scrollPos <= 4200 ? 'visible' : 'hidden'}}/>
          </div>
          <div className="content" style={{...contentStyle, display: isScrolling ? 'none' : 'initial'}}>
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
    isScrolling: state.isScrolling,
  }
}

Menu = connect(mapStateToProps)(Menu)

export default Menu
