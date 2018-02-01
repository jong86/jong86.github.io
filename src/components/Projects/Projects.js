import React, { Component } from 'react'
import './Projects.css'
import { connect } from 'react-redux'
import {
  fadeOpacity,
  moveComponentVertically,
  decHeightWithScrollPosition,
  incHeightWithScrollPosition,
  decWidthWithScrollPosition,
  incWidthWithScrollPosition,
} from '../../utils/animation.js'
import { projectsData } from './projectsData.js'

import AngleRight from 'react-icons/lib/fa/angle-right'
import AngleLeft from 'react-icons/lib/fa/angle-left'

import uuidv4 from 'uuid/v4'



class Projects extends Component {
  constructor() {
    super()
    this.state = {
      wrapperStyle: {},
      sectionStyle: {},
      titleStyle: {},
      contentStyle: {},

      currentPage: 0,
    }

    this.projectsData = projectsData

    this.initialWrapperHeight = '1px'
    this.wrapperMaxHeight = '800px'
  }

  componentWillMount = () => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
    } = this.props

    // For going backwards in animation progression
    if (scrollPos > breakPt[10] - 100) {
      this.setState({
        wrapperStyle: {
          top: '50%',
          opacity: 1.0,
          height: '1px',
        },
        sectionStyle: {
          width: '1px',
        },
      })
    } else {
      // For going forward in animation progression
      this.setState({
        wrapperStyle: {
          top: '50%',
          opacity: 1.0,
          height: this.initialWrapperHeight,
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
      scrollBreakpoints: breakPt,
    } = nextProps


    /*============
      Animation
    ============*/
    let breakPt1, breakPt2

    // Open first page
    breakPt1 = breakPt[4]
    breakPt2 = breakPt[5]
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          height: incHeightWithScrollPosition(this.wrapperMaxHeight, breakPt1, breakPt2, scrollPos),
        },
        contentStyle: {
          opacity: fadeOpacity('in', breakPt1, breakPt2, scrollPos),
        },
        titleStyle: {
          opacity: fadeOpacity('in', breakPt1, breakPt2, scrollPos),
        },
        currentPage: 0,
      })
    }

    // Close first page
    breakPt1 = breakPt[5]
    breakPt2 = breakPt[6]
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
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
        currentPage: 0,
      })
    }

    // Open second page
    breakPt1 = breakPt[6]
    breakPt2 = breakPt[7]
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
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
        currentPage: 1,
      })
    }

    // Close second page
    breakPt1 = breakPt[7]
    breakPt2 = breakPt[8]
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
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
        currentPage: 1,
      })
    }

    // Open third page
    breakPt1 = breakPt[8]
    breakPt2 = breakPt[9]
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
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
        currentPage: 2,
      })
    }


    // Close third page
    breakPt1 = breakPt[9]
    breakPt2 = breakPt[10]
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
        currentPage: 1,
      })
    }
  }


  render = () => {
    const { wrapperStyle, sectionStyle, titleStyle, contentStyle } = this.state
    const { scrollToBreakPoint } = this.props

    const startPrj = this.state.currentPage * 3
    const projects = this.projectsData.slice(startPrj, startPrj + 3).map(project =>
      (
        <div className="row" key={uuidv4()}>
          <div className="photo" key={uuidv4()}>
            this is the photo
          </div>
          <div className="description" key={uuidv4()}>
            <div className="title" key={uuidv4()}>
              { project.title }
            </div>
            <ul>
              { project.bulletPoints.map((bulletPoint, j) =>
                <li key={uuidv4()}>{ bulletPoint }</li>
              )}
            </ul>
          </div>
        </div>
      )
    )

    // Set next/last breakpoints for the pages
    let breakPtLast, breakPtNext
    switch (this.state.currentPage) {
      case 0:
        breakPtLast = null
        breakPtNext = 7
        break
      case 1:
        breakPtLast = 5
        breakPtNext = 9
        break
      case 2:
        breakPtLast = 7
        breakPtNext = 11
        break
      default:
        break
    }

    return (
      <div className="projects-wrapper" style={wrapperStyle}>
        <div className="projects no-select" style={sectionStyle}>
          <div className="heading" onClick={() => scrollToBreakPoint(3, 500)}>
            <div className="title" style={titleStyle}>
              PROJECTS { this.state.currentPage + 1 }
            </div>
          </div>
          <div className="content" style={contentStyle}>

            { projects }

            <div className="button-wrapper">
              <AngleLeft
                style={{ visibility: this.state.currentPage > 0 ? 'visible' : 'hidden' }}
                size={56}
                onClick={() => scrollToBreakPoint(breakPtLast, 500)}
              />
              <AngleRight
                className="btn-right"
                size={56}
                onClick={() => scrollToBreakPoint(breakPtNext, 500)}
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

Projects = connect(mapStateToProps)(Projects)

export default Projects
