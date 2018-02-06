import React, { Component } from 'react'
import './Summary.css'
import { connect } from 'react-redux'

import AngleDown from 'react-icons/lib/fa/angle-down'
import AngleUp from 'react-icons/lib/fa/angle-up'

import {
  fadeOpacity,
  moveComponentVerticallyUp,
  scrambleText,
} from '../../utils/animation.js'




class Summary extends Component {
  constructor() {
    super()
    this.state = {
      displayedText: '',
      wrapperStyle: {},
      sectionStyle: {},
    }
    this.summary = `I'm a web developer with a background including construction, oil rigs, and university. I've dabbled with making web pages since I was in high school, and I've recently decided on a career switch into what I have more passion for. I'm also an alumni of the Lighthouse Labs Web Dev Bootcamp in Vancouver.\n\nOther than coding, in my spare time I enjoy playing guitar and producing music.`

    this.topStartPct = '40%'
    this.cssMinHeight = 200

    this.synth = null
    this.synthIsPlaying = false
  }

  componentWillMount = () => {
    const { scrollPosition: scrollPos, scrollBreakpoints: breakPt } = this.props
    const { topStartPct } = this

    // If coming from later in animation progression
    if (scrollPos > breakPt[0]) {
      this.setState({
        wrapperStyle: {
          top: '-25%',
          opacity: 0,
        },
        sectionStyle: {
          height: scrollPos + this.cssMinHeight
        },
      })
    } else {
      // If starting from scrollPos 0
      this.setState({
        wrapperStyle: {
          top: topStartPct,
          opacity: 1.0,
        },
        sectionStyle: {
          // height: scrollPos + this.cssMinHeight
        },
      })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
    } = nextProps

    const { topStartPct } = this

    /*============
      Animation
    ============*/
    let breakPt1, breakPt2

    // To allow gap between descramble/scramble
    const scrambleOutDiff = 150

    // Centered in view, opening up
    breakPt1 = 0
    breakPt2 = breakPt[0]
    if (scrollPos <= breakPt2) {
      // Style fix if scrolled too fast
      this.setState({
        wrapperStyle: {
          top: topStartPct,
          opacity: 1.0,
        },
        sectionStyle: {
          height: scrollPos + this.cssMinHeight
        },
        // Descramble text
        displayedText: scrambleText(this.summary, 'descramble', breakPt1, breakPt2, scrollPos),
      })
    }

    // When moving up and out of view
    breakPt1 = breakPt[0]
    breakPt2 = breakPt[1]
    if (scrollPos > breakPt1 && scrollPos <= breakPt2) {
      this.setState({
        wrapperStyle: {
          top: moveComponentVerticallyUp(topStartPct, '-25%', breakPt1, breakPt2, scrollPos),
          opacity: fadeOpacity('out', breakPt1, breakPt2, scrollPos),
        },
        // Scramble text
        displayedText: scrambleText(this.summary, 'scramble', breakPt1 + scrambleOutDiff, breakPt1 + scrambleOutDiff + 200, scrollPos),
      })
    }

    // Make sure it's fully open when it should be
    if (scrollPos > breakPt[0]) {
      this.setState({
        sectionStyle: {
          height: breakPt[0] + this.cssMinHeight
        },
      })
    }

    // Make sure it's out of view when it should be
    if (scrollPos > breakPt[1]) {
      this.setState({
        wrapperStyle: {
          top: '-25%',
          opacity: 0.0,
        },
      })
    }
  }



  render = () => {
    const {
      displayedText,
      wrapperStyle,
      sectionStyle,
    } = this.state

    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
      scrollToBreakPoint,
    } = this.props

    const btnSize = 56
    const button = (scrollPos < breakPt[0]) ? (
      (<AngleDown size={btnSize} onClick={() => scrollToBreakPoint(0)}/>)
    ) : (
      (<AngleUp size={btnSize} onClick={() => scrollToBreakPoint(3)}/>)
    )

    return (
      <div className="summary-wrapper" style={wrapperStyle}>
        <div className="summary no-select" style={sectionStyle}>
          <div className="heading" onClick={() => scrollToBreakPoint(-1)}>
            <div className="name">
              Jon Gaspar
            </div>
            <div className="title">
              WEB DEVELOPER
            </div>
          </div>
          <div className="text">
            { displayedText }
          </div>
          { button }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    scrollPosition: state.scrollPosition,
    scrollBreakpoints: state.scrollBreakpoints
  }
}

Summary = connect(mapStateToProps)(Summary)

export default Summary
