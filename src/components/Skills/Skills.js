import React, { Component } from 'react'
import './Skills.css'
import { connect } from 'react-redux'
import {
  fadeOpacity,
  moveComponentVertically,
  decHeightWithScrollPosition,
  incWidthWithScrollPosition,
} from '../../utils/animation.js'
import { skillsData } from './skillsData.js'

import uuidv4 from 'uuid/v4'

import Menu from '../Menu/Menu.js'


class Skills extends Component {
  constructor() {
    super()
    this.state = {
      wrapperStyle: {},
      sectionStyle: {},
      titleStyle: {},
      contentStyle: {},
    }
    this.skillsData = skillsData

    this.initialWrapperHeight = '600px'
    this.wrapperMinHeight = '1px'
  }

  componentWillMount = () => {
    this.setState({
      wrapperStyle: {
        opacity: 0.0,
      }
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
    } = nextProps


    /*============
      Animation
    ============*/

    // Before coming into view
    if (scrollPos <= breakPt[1]) {
      // Style fix if scrolled too fast
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          top: '125%',
          height: this.initialWrapperHeight,
          minHeight: this.wrapperMinHeight,
          opacity: 0.0,
        }
      })
    }

    // Moving into view
    if (scrollPos > breakPt[1] && scrollPos <= breakPt[2]) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          top: moveComponentVertically('125%', '50%', breakPt[1], breakPt[2], scrollPos),
          opacity: fadeOpacity('in', breakPt[1], breakPt[2], scrollPos),
        },
        sectionStyle: {
          width: '2px',
        },
        contentStyle: {
          opacity: 0.0,
        },
      })
    }

    // When centered in view
    if (scrollPos > breakPt[2]) {
      // Style fix if scrolled too fast
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          top: '50%',
          opacity: 1.0,
        }
      })
    }

    // When centered in view, and opening up
    if (scrollPos > breakPt[2] && scrollPos <= breakPt[3]) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          height: this.initialWrapperHeight,
          top: '50%',
        },
        sectionStyle: {
          width: incWidthWithScrollPosition(breakPt[2], breakPt[3], scrollPos)
        },
        titleStyle: {
          opacity: fadeOpacity('in', breakPt[2], breakPt[3], scrollPos),
        },
        contentStyle: {
          opacity: 0,
        },
      })
    }

    // Fade in content just before component's width maxes out
    if (scrollPos > breakPt[3] - 100 && scrollPos <= breakPt[3]) {
      this.setState({
        contentStyle: {
          opacity: fadeOpacity('in', breakPt[3] - 100, breakPt[3], scrollPos),
        },
      })
    }

    // When should be centered and fully opened
    if (scrollPos > breakPt[3] && scrollPos <= breakPt[3] + 1)  {
      // Style fix if moved too fast
      this.setState({
        sectionStyle: {
          width: '100%',
        },
        contentStyle: {
          opacity: 1.0,
        },
      })
    }

    // When shrinking in height
    if (scrollPos > breakPt[3] && scrollPos <= breakPt[4]) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          opacity: 1.0,
          top: '50%',
          height: decHeightWithScrollPosition(this.initialWrapperHeight, breakPt[3], breakPt[4], scrollPos),
        },
        sectionStyle: {
          width: '100%',
        },
        contentStyle: {
          opacity: fadeOpacity('out', breakPt[3], breakPt[4] - 100, scrollPos),
        },
        titleStyle: {
          opacity: fadeOpacity('out', breakPt[3], breakPt[4] - 100, scrollPos),
        },
      })
    }

    if (scrollPos > breakPt[4]) {
      this.setState({
        wrapperStyle: {
          ...this.state.wrapperStyle,
          height: this.wrapperMinHeight,
        }
      })
    }
  }


  render = () => {
    const { wrapperStyle, sectionStyle, titleStyle, contentStyle } = this.state
    const { scrollToBreakPoint } = this.props

    const renderSkills = this.skillsData.map(section =>
      <div className='skills-content' key={uuidv4()}>
        <div className="label" key={uuidv4()}>
          { section.label }
        </div>
        <ul className="list" key={uuidv4()}>
          { section.items.map(item =>
            <li key={uuidv4()}>{ item }</li>
          )}
        </ul>
      </div>
    )

    return (
      <Menu
        title='Skills'
        renderContent={renderSkills}
        wrapperStyle={wrapperStyle}
        sectionStyle={sectionStyle}
        titleStyle={titleStyle}
        contentStyle={contentStyle}
        scrollToBreakPoint={scrollToBreakPoint}
        sectionColor='red'
        breakPtPrev={0}
        breakPtNext={5}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    scrollPosition: state.scrollPosition,
    scrollBreakpoints: state.scrollBreakpoints,
  }
}

Skills = connect(mapStateToProps)(Skills)


export default Skills
