import React, { Component } from 'react'
import './Summary.css'
import { connect } from 'react-redux'

import AngleDown from 'react-icons/lib/fa/angle-down'
import AngleUp from 'react-icons/lib/fa/angle-up'

import { fadeOpacity, moveComponentVertically, scrambleText } from '../../utils/animation.js'




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
          height: scrollPos + this.cssMinHeight
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

    // To allow gap between descramble/scramble
    const scrambleOutDiff = 150

    // When centered in view, opening up
    if (scrollPos <= breakPt[0]) {
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
        displayedText: scrambleText(this.summary, 'descramble', 0, breakPt[0], scrollPos),
      })
    }

    // Display the original text for a bit
    if (scrollPos > breakPt[0] && scrollPos <= breakPt[0] + scrambleOutDiff) {
      this.setState({
        displayedText: this.summary,
      })
    }

    // Scramble text on the way out
    if (scrollPos > breakPt[0] + scrambleOutDiff) {
      this.setState({
        displayedText: scrambleText(this.summary, 'scramble', breakPt[0] + scrambleOutDiff, breakPt[0] + scrambleOutDiff + 200, scrollPos),
      })
    }

    // When moving up and out of view
    if (scrollPos > breakPt[0] && scrollPos <= breakPt[1]) {
      this.setState({
        wrapperStyle: {
          top: moveComponentVertically(topStartPct, '-25%', breakPt[0], breakPt[1], scrollPos),
          opacity: fadeOpacity('out', breakPt[0], breakPt[1], scrollPos),
        }
      })
    }

    // When should be fully open
    if (scrollPos > breakPt[0]) {
      this.setState({
        sectionStyle: {
          height: breakPt[0] + this.cssMinHeight
        },
      })
    }

    // When should be out of view
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
