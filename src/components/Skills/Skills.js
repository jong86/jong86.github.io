import React, { Component } from 'react'
import './Skills.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down'
import { fadeOpacity } from '../../utils/animation.js'


class Skills extends Component {
  constructor() {
    super()
    this.state = {
      sectionStyle: {},
      textStyle: {},
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
    } = nextProps


    // While moving in
    if (scrollPos <= breakPt[2]) {
      this.setState({
        textStyle: {
          opacity: 0.0,
        },
        sectionStyle: {
          width: '2px',
        },
      })
    }

    // Opening up
    if (scrollPos > breakPt[2] && scrollPos <= breakPt[3]) {
      this.setState({
        sectionStyle: {
          width: this.setWidthWithScrollPosition(breakPt[2], breakPt[3])
        },
        textStyle: {
          opacity: fadeOpacity('in', breakPt[2], breakPt[3], scrollPos),
        },
      })
    }

    // Ensure max opened past breakPt3
    if (scrollPos > breakPt[3]) {
      this.setState({
        sectionStyle: {
          width: '100%',
        },
        textStyle: {
          opacity: 1.0,
        },
      })
    }
  }

  setWidthWithScrollPosition = (breakPt1, breakPt2) => {
    const { scrollPosition: scrollPos} = this.props
    return (((scrollPos - breakPt1) / (breakPt2 - breakPt1)) * 100) + '%'
  }

  render = () => {
    const { sectionStyle, textStyle } = this.state

    return (
      <div className="skills no-select" style={sectionStyle}>
        <div className="heading">
          <div className="title" style={textStyle}>
            SKILLS
          </div>
        </div>
        <div className="text" style={textStyle}>
          Languages: Javascript, Python, Ruby<br/>
          Front-End: React, React-Native, Redux, Vue, JQuery, CSS/SCSS<br/>
          Back-End: Node, Express, Ruby on Rails, SQL, MongoDB, Web Sockets<br/>
          Other: Photoshop, Google Maps API, Web Audio API<br/>
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

Skills = connect(mapStateToProps)(Skills)

export default Skills
