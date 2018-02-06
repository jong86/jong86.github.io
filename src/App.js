import React, { Component } from 'react'
import './App.css'
import './components/Skills/Skills.css'

import Summary from './components/Summary/Summary.js'

// import Skills from './components/Skills/Skills.js'
import { renderSkills } from './components/Skills/skillsData.js'

import Projects from './components/Projects/Projects.js'

import Education from './components/Education/Education.js'

import Other from './components/Other/Other.js'


import Menu from './components/Menu/Menu.js'

import action from './redux/action.js'
import { connect } from 'react-redux'

import Synth from './utils/Synth.js'
import { freqExp } from './utils/soundMod.js'


class App extends Component {
  constructor() {
    super()
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }


  componentWillMount = () => {
    // Scroll to top of page on load:
    window.onbeforeunload = () => window.scrollTo(0, 0)

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


  scrollToBreakPoint = (specifiedBreakPt) => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
      setIsScrolling
    } = this.props

    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

    // Diff between current scrollPos and specifiedBreakPt
    this.posDiff = Math.abs(scrollPos - breakPt[specifiedBreakPt])

    setIsScrolling(true)
    this.req = requestAnimationFrame(() => this.handleAnimation(specifiedBreakPt))
  }


  handleAnimation = (specifiedBreakPt) => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
      setScrollPosition,
      setIsScrolling
    } = this.props

    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    // To determine if animation is going forward or backward
    const directionMod = scrollPos < breakPt[specifiedBreakPt] ? 1 : -1

    // Divide by 30 for half a second per transition (60 for full second)
    const amtPerFrame = this.posDiff / 30

    if (Math.abs(scrollPos - breakPt[specifiedBreakPt]) < amtPerFrame) {
      // If within less than one movement unit, make scrollPos the breakPt
      setScrollPosition(breakPt[specifiedBreakPt])
      setIsScrolling(false)
      cancelAnimationFrame(this.req)

    } else if (Math.abs(scrollPos - breakPt[specifiedBreakPt]) > 0) {
      // Regular behavior
      setScrollPosition(scrollPos + ((amtPerFrame) * directionMod))
      this.req = requestAnimationFrame(() => this.handleAnimation(specifiedBreakPt))
    }
  }


  /*=========
    Render
  =========*/
  render = () => {
    const { scrollPosition: scrollPos, scrollBreakpoints: breakPt } = this.props

    return (
      <div className="App">

        { (scrollPos <= breakPt[1] &&
          <Summary scrollToBreakPoint={this.scrollToBreakPoint}/>
        ) || (
          scrollPos > breakPt[1] && scrollPos <= breakPt[5] &&
          <Menu
            scrollToBreakPoint={this.scrollToBreakPoint}
            title='Skills'
            renderContent={renderSkills}
            sectionColor='red'
            breakPt1={breakPt[1]}
            breakPt2={breakPt[2]}
            breakPt3={breakPt[3]}
            breakPt4={breakPt[4]}
            breakPt5={breakPt[5]}
            breakPtPrev={0}
            breakPtNext={6}
          />
        ) || (
          scrollPos > breakPt[6] && scrollPos <= breakPt[10] &&
          <Projects scrollToBreakPoint={this.scrollToBreakPoint}/>
        ) || (
          scrollPos > breakPt[10] && scrollPos <= breakPt[12] &&
          <Education scrollToBreakPoint={this.scrollToBreakPoint}/>
        ) || (
          scrollPos > breakPt[12] &&
          <Other scrollToBreakPoint={this.scrollToBreakPoint}/>
        )}

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
