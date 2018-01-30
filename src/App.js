import React, { Component } from 'react';
import './App.css';

import BgSpaceNodes from './components/BgSpaceNodes/BgSpaceNodes.js'
import Summary from './components/Summary/Summary.js'
import Skills from './components/Skills/Skills.js'

import { fadeOpacity, moveComponentVertically } from './utils/animation.js'

import action from './redux/action.js'
import { connect } from 'react-redux'

import throttle from 'lodash.throttle'

import Synth from './utils/Synth.js'
import { freqExp } from './utils/soundMod.js'


class App extends Component {
  constructor() {
    super()
    this.state = {
      sectionTwoStyle: {},
    }

    // For isScrolling detection
    this.timeoutScroll = null
    this.handleScroll = this.handleScroll.bind(this);

    // For scroll rate
    this.lastTime = null
    this.lastScrollPosition = null
  }


  componentWillMount = () => {
    // Scroll to top of page on load:
    window.onbeforeunload = () => window.scrollTo(0,0)

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

    // Adjust function for before / after breakPts
    let direction, breakPt1, breakPt2
    if (scrollPos <= breakPt[0]) {
      direction = 'down'
      breakPt1 = 0
      breakPt2 = breakPt[0]
    } else if (scrollPos > breakPt[0] && scrollPos <= breakPt[1]) {
      direction = 'up'
      breakPt1 = breakPt[0]
      breakPt2 = breakPt[1]
    } else if (scrollPos > breakPt[1] && scrollPos <= breakPt[2]) {
      direction = 'down'
      breakPt1 = breakPt[1]
      breakPt2 = breakPt[2]
    } else if (scrollPos > breakPt[2] && scrollPos <= breakPt[3]) {
      direction = 'up'
      breakPt1 = breakPt[2]
      breakPt2 = breakPt[3]
    }

    // Pitch modulation function
    const freq = freqExp(direction, breakPt1, breakPt2, 17000, 0, scrollPos)

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
      // Re-create the sound object as required by Web Audio API
      this.instantiateSynth()
    }
  }


  instantiateSynth = () => {
    // This needs to happen to replay sound
    this.synth = new Synth(this.props.audioContext, 'triangle', 900, 400)
  }


  /*=======================
    Scroll event handler
  =======================*/
  handleScroll = (event) => {
    const { setScrollPosition, setIsScrolling, scrollPosition } = this.props

    /*======================================
      Save scroll position in redux store
    ======================================*/
    setScrollPosition(document.documentElement.scrollTop)


    /*===================================
      Save scroll state in redux store
    ===================================*/
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


    /*==================================
      Save scroll rate in redux store
    ==================================*/
    const { audioContext, setScrollRate } = this.props

    const now = audioContext.currentTime
    if (!this.lastTime || (now - this.lastTime) > 0.025) {
      this.lastTime = audioContext.currentTime
      this.lastScrollPosition = scrollPosition
    }
    const scrollRate = (
      (Math.abs(scrollPosition - this.lastScrollPosition) / (now - this.lastTime)) + 40
    )
    if (scrollRate) setScrollRate(scrollRate)
  }


  /*=========
    Render
  =========*/
  render = () => {
    return (
      <div className="App">

        <BgSpaceNodes/>

        <Summary/>

        <Skills/>

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
    audioContext: state.audioContext,
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
    setScrollRate: (scrollRate) => {
      dispatch(action('SET_SCROLL_RATE', { scrollRate: scrollRate }))
    }
  })
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
