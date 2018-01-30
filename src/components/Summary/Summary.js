import React, { Component } from 'react'
import './Summary.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down'
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

    this.cssMinHeight = 192

    this.synth = null
    this.synthIsPlaying = false
  }

  componentWillMount = () => {
    const { scrollPosition: scrollPos } = this.props
    this.setState({
      wrapperStyle: {
        top: '50%',
        opacity: 1.0,
      },
      sectionStyle: {
        height: scrollPos + this.cssMinHeight
      },
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
    } = nextProps


    /*============================
      Summary section animation
    ============================*/

    // When centered in view, opening up
    if (scrollPos <= breakPt[0]) {
      // Style fix if scrolled too fast
      this.setState({
        wrapperStyle: {
          top: '50%',
          opacity: 1.0,
        },
        sectionStyle: {
          // Max height of summary is determined by height of wrapper
          height: scrollPos + this.cssMinHeight
        },
      })
    }

    // When moving up and out of view
    if (scrollPos > breakPt[0] && scrollPos <= breakPt[1]) {
      this.setState({
        wrapperStyle: {
          top: moveComponentVertically('50%', '-25%', breakPt[0], breakPt[1], scrollPos),
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


    /*================
      Scrambled Text
    ================*/

    // To allow gap between descramble/scramble
    const scrambleOutDiff = 150

    // Breakpoints where text scrambling should happen
    if (scrollPos <= breakPt[0]) {
      this.setState({
        displayedText: scrambleText(this.summary, 'descramble', 0, breakPt[0], scrollPos),
      })
    } else if (scrollPos > breakPt[0] + scrambleOutDiff) {
      this.setState({
        displayedText: scrambleText(this.summary, 'scramble', breakPt[0] + scrambleOutDiff, breakPt[0] + scrambleOutDiff + 200, scrollPos),
      })
    }

    // Display the original text for a bit
    if (scrollPos > breakPt[0] && scrollPos <= breakPt[0] + scrambleOutDiff) {
      this.setState({
        displayedText: this.summary,
      })
    }
  }


  render = () => {
    const { displayedText, wrapperStyle, sectionStyle } = this.state

    return (
      <div className="section-wrapper" style={wrapperStyle}>
        <div className="summary no-select" style={sectionStyle}>
          <div className="heading">
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
          <AngleDown size={48}/>
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
