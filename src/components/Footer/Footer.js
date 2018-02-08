import React, { Component } from 'react'
import './Footer.css'
import { connect } from 'react-redux'

class Footer extends Component {
  handleClick = (dest) => {
    const { scrollPosition: scrollPos, scrollTo } = this.props
    if (scrollPos !== dest) scrollTo(dest)
  }

  render = () => {
    const { scrollBreakpoints: breakPt } = this.props
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
          OTHER
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
