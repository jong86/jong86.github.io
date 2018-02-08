import React, { Component } from 'react'
import './Footer.css'
import { connect } from 'react-redux'

import CaretDown from 'react-icons/lib/fa/caret-down'

class Footer extends Component {
  constructor() {
    super()
    this.state = {
      progressStyle: {
        left: '0%',
      },
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      scrollPosition: scrollPos,
    } = nextProps

    this.setState({
      progressStyle:{
        ...this.state.progressStyle,
        left: this.getProgressIndicatorLeftPos(scrollPos),
      },
    })
  }

  getProgressIndicatorLeftPos = (scrollPos) => {
    const { scrollBreakpoints: breakPt } = this.props

    let pctScroll = (((scrollPos - 200) / (breakPt[12] - 200)) * 100)

    // Makes sure it doesn't go below zero (initial summary section has an exception)
    pctScroll = pctScroll < 0 ? 0 : pctScroll
    return pctScroll + '%'
  }

  handleClick = (dest) => {
    const { scrollPosition: scrollPos, scrollTo } = this.props
    if (scrollPos !== dest) scrollTo(dest)
  }

  render = () => {
    const { scrollBreakpoints: breakPt } = this.props
    const { progressStyle } = this.state
    const { handleClick } = this

    return (
      <footer className="no-select">
        <div className="btn-footer" onClick={() => handleClick(breakPt[0])}>
          SUMMARY
        </div>
        <div className="btn-footer" onClick={() => handleClick(breakPt[3])}>
          SKILLS
        </div>
        <div className="btn-footer" onClick={() => handleClick(breakPt[6])}>
          PROJECTS
        </div>
        <div className="btn-footer" onClick={() => handleClick(breakPt[9])}>
          EDUCATION
        </div>
        <div className="btn-footer" onClick={() => handleClick(breakPt[12])}>
          CONTACT
        </div>
        <div className="progress-track">
          <div className="progress-indicator-wrapper" style={progressStyle}>
            <div className="progress-indicator">
              <CaretDown className="icon" size={64} color="white"/>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

function mapStateToProps(state) {
  return {
    scrollPosition: state.scrollPosition,
    scrollBreakpoints: state.scrollBreakpoints,
  }
}

Footer = connect(mapStateToProps)(Footer)

export default Footer
