import React, { Component } from 'react'
import './Skills.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down'
import { fadeOpacity, moveComponentVertically } from '../../utils/animation.js'


class Skills extends Component {
  constructor() {
    super()
    this.state = {
      wrapperStyle: {},
      sectionStyle: {},
      textStyle: {},
    }
  }

  componentWillMount = () => {
    this.setState({
      wrapperStyle: {
        top: '125%',
        opacity: 0.0,
      }
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
    } = nextProps


    /*===========================
      Skills section animation
    ===========================*/
    if (scrollPos <= breakPt[1]) {
      // Fix style if scrolled too fast
      this.setState({
        wrapperStyle: {
          opacity: 0.0,
        }
      })
    }


    if (scrollPos > breakPt[1] && scrollPos <= breakPt[2]) {
      // Regular behavior
      this.setState({
        wrapperStyle: {
          top: moveComponentVertically('125%', '50%', breakPt[1], breakPt[2], scrollPos),
          opacity: fadeOpacity('in', breakPt[1], breakPt[2], scrollPos),
        }
      })
    }

    if (scrollPos > breakPt[2]) {
      // Fix style if scrolled too fast
      this.setState({
        wrapperStyle: {
          top: '50%',
          opacity: 1.0,
        }
      })
    }

    // While moving into view
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
    const { wrapperStyle, sectionStyle, textStyle } = this.state

    return (
      <div className="section-wrapper" style={wrapperStyle}>
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
