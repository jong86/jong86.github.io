import React, { Component } from 'react'
import './Projects.css'
import { connect } from 'react-redux'
import { fadeOpacity, moveComponentVertically } from '../../utils/animation.js'
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
    // When expanding in height
    if (scrollPos > breakPt[4] && scrollPos <= breakPt[5]) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          height: this.incHeightWithScrollPosition(breakPt[4], breakPt[5]),
        },
        contentStyle: {
          opacity: fadeOpacity('in', breakPt[4], breakPt[5], scrollPos),
        },
        titleStyle: {
          opacity: fadeOpacity('in', breakPt[4], breakPt[5], scrollPos),
        },
      })
    }
  }


  loadAndAnimatePageChange = (page) => {
    // Make width go to 1px, change displayed projects, then open back up again


  }

  incHeightWithScrollPosition = (breakPt1, breakPt2) => {
    const { scrollPosition: scrollPos } = this.props
    const diff1 = scrollPos - breakPt1
    const diff2 = breakPt2 - breakPt1

    const output = (diff1 / diff2) * parseInt(this.wrapperMaxHeight)
    return output < 1 ? '1px' : output + 'px'
  }

  render = () => {
    const { wrapperStyle, sectionStyle, titleStyle, contentStyle } = this.state
    const { scrollToBreakPoint } = this.props

    const projects = this.projectsData.map(project =>
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
              PROJECTS
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
