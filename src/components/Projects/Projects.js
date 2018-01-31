import React, { Component } from 'react'
import './Projects.css'
import { connect } from 'react-redux'
import {
  fadeOpacity,
  moveComponentVertically,
  incHeightWithScrollPosition,
  decWidthWithScrollPosition,
  incWidthWithScrollPosition,
} from '../../utils/animation.js'
import { projectsData } from './projectsData.js'

import uuidv4 from 'uuid/v4'



class Projects extends Component {
  constructor() {
    super()
    this.state = {
      wrapperStyle: {},
      sectionStyle: {},
      titleStyle: {},
      contentStyle: {},

      projectsPage: 0,
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

    // For dev purposes to show this section on page load:
    if (scrollPos > breakPt[5]) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          top: '50%',
          height: this.wrapperMaxHeight,
        }
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

    // When expanding in height
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
        projectsPage: 0,
      })
    }

    // When closing first page
    breakPt1 = breakPt[5]
    breakPt2 = breakPt[6]
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
        sectionStyle: {
          ...this.state.sectionStyle,
          width: decWidthWithScrollPosition(breakPt1, breakPt2, scrollPos),
        },
        projectsPage: 0,
      })
    }

    // When opening second page
    breakPt1 = breakPt[6]
    breakPt2 = breakPt[7]
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
        sectionStyle: {
          ...this.state.sectionStyle,
          width: incWidthWithScrollPosition(breakPt1, breakPt2, scrollPos),
        },
        projectsPage: 1,
      })
    }

    // When closing second page
    breakPt1 = breakPt[7]
    breakPt2 = breakPt[8]
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
        sectionStyle: {
          ...this.state.sectionStyle,
          width: decWidthWithScrollPosition(breakPt1, breakPt2, scrollPos),
        },
        projectsPage: 1,
      })
    }

    // When opening third page
    breakPt1 = breakPt[8]
    breakPt2 = breakPt[9]
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
        sectionStyle: {
          ...this.state.sectionStyle,
          width: incWidthWithScrollPosition(breakPt1, breakPt2, scrollPos),
        },
        projectsPage: 1,
      })
    }
  }


  render = () => {
    const { wrapperStyle, sectionStyle, titleStyle, contentStyle } = this.state
    const { scrollToBreakPoint } = this.props

    const startPrj = this.state.projectsPage * 3
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

    return (
      <div className="projects-wrapper" style={wrapperStyle}>
        <div className="projects no-select" style={sectionStyle}>
          <div className="heading" onClick={() => scrollToBreakPoint(3, 500)}>
            <div className="title" style={titleStyle}>
              PROJECTS { this.state.projectsPage + 1 }
            </div>
          </div>
          <div className="content" style={contentStyle}>

            { projects }

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
