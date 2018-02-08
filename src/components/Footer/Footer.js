import React, { Component } from 'react'
import './Footer.css'
import { connect } from 'react-redux'

class Footer extends Component {
  handleClick = (scrollDest) => {
    const { scrollToBreakPoint: scrollTo, scrollBreakpoints: breakPt } = this.props
    switch (scrollDest) {
      case 'summary':
        return scrollTo(breakPt[0])
      case 'skills':
        return scrollTo(breakPt[3])
      case 'projects':
        return scrollTo(breakPt[6])
      case 'education':
        return scrollTo(breakPt[9])
      case 'other':
        return scrollTo(breakPt[12])
      default:
        break
    }
  }

  render = () => {
    const { handleClick } = this
    return (
      <footer className="no-select">
        <div className="btn-footer btn-summary" onClick={() => handleClick('summary')}>
          SUMMARY
        </div>
        <div className="btn-footer btn-skills" onClick={() => handleClick('skills')}>
          SKILLS
        </div>
        <div className="btn-footer btn-projects" onClick={() => handleClick('projects')}>
          PROJECTS
        </div>
        <div className="btn-footer btn-education" onClick={() => handleClick('education')}>
          EDUCATION
        </div>
        <div className="btn-footer btn-other" onClick={() => handleClick('other')}>
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
