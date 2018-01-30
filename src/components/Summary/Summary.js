import React, { Component } from 'react'
import './Summary.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down'
import { fadeOpacity, moveComponentVertically } from '../../utils/animation.js'




class Summary extends Component {
  constructor() {
    super()
    this.state = {
      displayedText: '',
      wrapperStyle: {},
      sectionStyle: {},
    }
    this.realText = `I'm a web developer with a background including construction, oil rigs, and university. I've dabbled with making web pages since I was in high school, and I've recently decided on a career switch into what I have more passion for. I'm also an alumni of the Lighthouse Labs Web Dev Bootcamp in Vancouver.\n\nOther than coding, in my spare time I enjoy playing guitar and producing music.`
    this.chars = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`

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



    /*========================
      Section One Animation
    ========================*/

    // Set height
    this.setState({
      sectionStyle: { height: scrollPos + this.cssMinHeight},
      // Max height of summary is determined by height of wrapper
    })


    if (scrollPos <= breakPt[0]) {

      // Fix style if scrolled too fast
      this.setState({
        wrapperStyle: {
          top: '50%',
          opacity: 1.0,
        },
      })
    }

    if (scrollPos <= breakPt[1]) {

      // Regular behavior
      if (scrollPos > breakPt[0]) {
        this.setState({
          wrapperStyle: {
            top: moveComponentVertically('50%', '-25%', breakPt[0], breakPt[1], scrollPos),
            opacity: fadeOpacity('out', breakPt[0], breakPt[1], scrollPos),
          }
        })
      }

      // Fix style if scrolled too fast
      this.setState({ // TO DO: move this to Skills.js
        sectionTwoStyle: {
          opacity: 0.0,
        }
      })
    }

    // Edge case fix
    // Sets menu to full open if past textBreakpoint, because of bug with scrolling really fast
    if (scrollPos > breakPt[0]) {
      this.setState({
        sectionStyle: { height: breakPt[0] + this.cssMinHeight },
      })
    }


    /*================
      Scrambled Text
    ================*/
    const scrambleOutDiff = 150

    if (scrollPos <= breakPt[0] || scrollPos > breakPt[0] + scrambleOutDiff) {
      let scrambledText = ''
      const lenChars = this.chars.length
      this.realText.split('').forEach(letter => {
        if (letter === ' ' || letter === '\n') {
          // Keeps the spaces
          scrambledText += letter
        }
        else if (Math.random() > (scrollPos /  breakPt[0]) && scrollPos < breakPt[0]) {
          // Text de-scrambling on the way in:
          // The 'if' evaluates as true less often as scrollPos increases, so causes scramble amount to 'fade-out'
          scrambledText += this.chars[Math.floor(Math.random() * lenChars)]
        }
        else if (Math.random() < ((scrollPos / breakPt[0] + scrambleOutDiff) - 1) && scrollPos > breakPt[0] + scrambleOutDiff) {
          // Text re-scrambling on the way out:
          // The 'if' evaluates as true MORE often as scrollPos increases, when past 2nd scrollPos breakpoint
          scrambledText += this.chars[Math.floor(Math.random() * lenChars)]
        }
        else {
          scrambledText += letter
        }
      })

      this.setState({
        displayedText: scrambledText,
      })
    }

    if (scrollPos > breakPt[0] && scrollPos <= breakPt[0] + scrambleOutDiff) {
      this.setState({
        displayedText: this.realText,
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
