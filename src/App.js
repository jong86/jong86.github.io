import React, { Component } from 'react'
import './App.css'
import './components/Menu/skills/skills.css'

import Summary from './components/Summary/Summary.js'

import Menu from './components/Menu/Menu.js'
import { renderSkills } from './components/Menu/skills/skills.js'
import { renderProjects } from './components/Menu/projects/projects.js'

import Projects from './components/Projects/Projects.js'
import Education from './components/Education/Education.js'
import Other from './components/Other/Other.js'


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


  scrollToPosition = (destPos) => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
      setIsScrolling
    } = this.props

    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

    // Diff between current scrollPos and destPos
    this.posDiff = Math.abs(scrollPos - destPos)

    setIsScrolling(true)
    this.req = requestAnimationFrame(() => this.handleAnimation(destPos))
  }


  handleAnimation = (destPos) => {
    const {
      scrollPosition: scrollPos,
      scrollBreakpoints: breakPt,
      setScrollPosition,
      setIsScrolling
    } = this.props

    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    // To determine if animation is going forward or backward
    const directionMod = scrollPos < destPos ? 1 : -1

    // Divide by 30 for half a second per transition (60 for full second)
    const amtPerFrame = this.posDiff / 30

    if (Math.abs(scrollPos - destPos) < amtPerFrame) {
      // If within less than one movement unit, make scrollPos the breakPt
      setScrollPosition(destPos)
      setIsScrolling(false)
      cancelAnimationFrame(this.req)

    } else if (Math.abs(scrollPos - destPos) > 0) {
      // Regular behavior
      setScrollPosition(scrollPos + ((amtPerFrame) * directionMod))
      this.req = requestAnimationFrame(() => this.handleAnimation(destPos))
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
          <Summary scrollToBreakPoint={this.scrollToPosition}/>
        ) || (
          scrollPos > breakPt[1] && scrollPos <= breakPt[5] &&
          <Menu
            scrollToBreakPoint={this.scrollToPosition}
            title='Skills'
            sectionColor='red'
            breakPt1={breakPt[1]}
            breakPt2={breakPt[2]}
            breakPt3={breakPt[3]}
            breakPt4={breakPt[4]}
            breakPt5={breakPt[5]}
            renderContent={renderSkills}
            hasPages={false}
          />
        ) || (
          scrollPos > breakPt[6] && scrollPos <= breakPt[18] &&
          <Menu
            scrollToBreakPoint={this.scrollToPosition}
            title='Projects'
            sectionColor='cyan'
            breakPt1={breakPt[6]}
            breakPt2={breakPt[7]}
            breakPt3={breakPt[8]}
            breakPt4={breakPt[9]}
            breakPt5={breakPt[10]}
            renderContent={renderProjects}
            hasPages={true}
            numPerPage={3}
          />
        ) || (
          scrollPos > breakPt[19] && scrollPos <= breakPt[23] &&
          <Education scrollToBreakPoint={this.scrollToPosition}/>
        ) || (
          scrollPos > breakPt[24] && scrollPos <= breakPt[28] &&
          <Other scrollToBreakPoint={this.scrollToPosition}/>
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
