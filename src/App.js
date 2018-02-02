import React, { Component } from 'react';
import './App.css';

import BgSpaceNodes from './components/BgSpaceNodes/BgSpaceNodes.js'
import Summary from './components/Summary/Summary.js'
import Skills from './components/Skills/Skills.js'
import Projects from './components/Projects/Projects.js'
import Education from './components/Education/Education.js'

import action from './redux/action.js'
import { connect } from 'react-redux'

import throttle from 'lodash.throttle'

import Synth from './utils/Synth.js'
import { freqExp } from './utils/soundMod.js'

import Scroll from 'react-scroll'

// import disableScroll from 'disable-scroll';
// disableScroll.on(document.scrollingElement, { disableScroll: false });

const scroll = Scroll.animateScroll


class App extends Component {
  constructor() {
    super()

    // For isScrolling detection
    this.timeoutScroll = null
    this.handleScroll = this.handleScroll.bind(this)

    // For scroll rate
    this.lastTime = null
    this.lastScrollPosition = null

    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }


  componentWillMount = () => {
    const { scrollBreakpoints: breakPt } = this.props

    // Scroll to top of page on load:
    // window.onbeforeunload = () => window.scrollTo(0, breakPt[1])
    window.onbeforeunload = () => window.scrollTo(0, 0)

    // Add scroll listener
    window.addEventListener('scroll', throttle(this.handleScroll, 8));

    this.instantiateSynth()
  }


  componentWillReceiveProps = (nextProps) => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
      isScrolling,
    } = nextProps


    /*===============
      Sound effect
    ===============*/

    // Set breakPts and direction for sound frequency function
    let direction, breakPt1, breakPt2
    if (scrollPos <= breakPt[0]) {
      direction = 'down'
      breakPt1 = 0
      breakPt2 = breakPt[0]
    } else {
      for (let i = 0; i < breakPt.length; i++) {
        if (scrollPos > breakPt[i] && scrollPos <= breakPt[i + 1]) {
          direction = (i % 2 === 0 || i === 0) ? 'up' : 'down'
          breakPt1 = breakPt[i]
          breakPt2 = breakPt[i + 1]
          break
        }
      }
    }

    // Pitch modulation function
    const freq = freqExp(direction, breakPt1, breakPt2, 22050, 0, scrollPos)

    // To play the sound
    if (isScrolling && !this.synthIsPlaying) {
      this.synthIsPlaying = true
      this.synth.play(freq)
    }

    // Continuously set sound frequency as scrollPos (props) changes
    this.synth.frequency = freq
  }


  componentDidUpdate = () => {
    const { isScrolling } = this.props

    // To stop the sound:
    if (!isScrolling && this.synthIsPlaying) {
      this.synthIsPlaying = false
      this.synth.stop()
      // Re-create the sound object
      this.instantiateSynth()
    }
  }


  instantiateSynth = () => {
    // This is required to replay the sound
    this.synth = new Synth(this.audioContext, 'triangle', 900, 400)
  }


  /*=======================
    Scroll event handler
  =======================*/
  handleScroll = (event) => {
    const { setScrollPosition, setIsScrolling } = this.props

    // Save scroll position in redux store
    setScrollPosition(document.documentElement.scrollTop)


    // Get scroll state and save in redux store
    if (this.timeoutScroll) {
      // If there is already a timeout in process then cancel it
      clearTimeout(this.timeoutScroll)
    }
    this.timeoutScroll = setTimeout(() => {
      this.timeoutScroll = null
      setIsScrolling(false)
    }, 60)
    if (this.props.isScrolling !== true) {
      setIsScrolling(true)
    }
  }


  scrollToBreakPoint = (specifiedBreakPt, specifiedDuration) => {
    let duration = 1000
    if (specifiedDuration) duration = specifiedDuration
    if (specifiedBreakPt < 0) return scroll.scrollTo(0, { smooth: true, duration: duration })
    const { scrollBreakpoints: breakPt } = this.props
    return scroll.scrollTo(breakPt[specifiedBreakPt], { smooth: true, duration: duration })
  }


  /*=========
    Render
  =========*/
  render = () => {
    const { scrollPosition: scrollPos, scrollBreakpoints: breakPt } = this.props

    return (
      <div className="App">

        <BgSpaceNodes/>

        { scrollPos <= breakPt[1] &&
          <Summary scrollToBreakPoint={this.scrollToBreakPoint}/>
        ||
          scrollPos > breakPt[1] && scrollPos <= breakPt[4] &&
          <Skills scrollToBreakPoint={this.scrollToBreakPoint}/>
        ||
          scrollPos > breakPt[4] && scrollPos <= breakPt[10] &&
          <Projects scrollToBreakPoint={this.scrollToBreakPoint}/>
        ||
          scrollPos > breakPt[10] &&
          <Education scrollToBreakPoint={this.scrollToBreakPoint}/>
        }
      </div>
    )
  }
}


/*=========
  Redux
=========*/
function mapStateToProps(state) {
  return {
    scrollPosition: state.scrollPosition,
    isScrolling: state.isScrolling,
    scrollBreakpoints: state.scrollBreakpoints,
  }
}

function mapDispatchToProps(dispatch) {
  return({
    setScrollPosition: (scrollPosition) => {
      dispatch(action('SET_SCROLL_POSITION', { scrollPosition: scrollPosition }))
    },
    setIsScrolling: (boolean) => {
      dispatch(action('SET_IS_SCROLLING', { boolean: boolean }))
    },
  })
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
