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

import uuidv4 from 'uuid/v4'

import Menu from '../Menu/Menu.js'



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
      })
    }
  }


  render = () => {
    const { wrapperStyle, sectionStyle, titleStyle, contentStyle, currentPage } = this.state
    const { scrollToBreakPoint } = this.props

    const startPrj = currentPage * 3
    const renderProjects = this.projectsData.slice(startPrj, startPrj + 3).map(project => (
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
    ))

    return (
      <Menu
        title='Projects'
        renderContent={renderProjects}
        wrapperStyle={wrapperStyle}
        sectionStyle={sectionStyle}
        titleStyle={titleStyle}
        contentStyle={contentStyle}
        scrollToBreakPoint={scrollToBreakPoint}
        sectionColor='cyan'
        breakPtPrev={3 + (currentPage * 2)}
        breakPtNext={7 + (currentPage * 2)}
      />
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
