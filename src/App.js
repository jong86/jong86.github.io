import React, { Component } from 'react'
import './App.css'
import './components/Menu/skills/skills.css'
import './components/Menu/projects/projects.css'
import './components/Menu/education/education.css'
import './components/Menu/other/other.css'

import Summary from './components/Summary/Summary.js'
import Menu from './components/Menu/Menu.js'
import { renderSkills } from './components/Menu/skills/skills.js'
import { renderProjects } from './components/Menu/projects/projects.js'
import { renderEducation } from './components/Menu/education/education.js'
import { renderOther } from './components/Menu/other/other.js'
import Footer from './components/Footer/Footer.js'

import action from './redux/action.js'
import { connect } from 'react-redux'

import Synth from './utils/Synth.js'
import { freqExp } from './utils/soundMod.js'


class App extends Component {
  constructor() {
    super()
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.soundFreq = 0
    this.soundDirection = ''
    this.soundBreakPt1 = 0
    this.soundBreakPt2 = 0
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
      scrollDirection,
    } = nextProps


    /*===============
      Sound effect
    ===============*/
    const freqMax = 19000
    const freqMin = 60


    // Determine breakPts and direction for sound frequency function
    // Make exception for first menu opening down (Summary)
    if (scrollPos < breakPt[0]) {
      this.soundDirection = 'down'
      this.soundBreakPt1 = 0
      this.soundBreakPt2 = breakPt[0]
    } else {
      // For rest of animations
      for (let i = 0; i < breakPt.length; i += 3) {
        if (scrollPos > breakPt[i] && scrollPos < breakPt[i + 3]) {
          this.soundDirection = 'up'
          this.soundBreakPt1 = breakPt[i]
          this.soundBreakPt2 = breakPt[i + 3]
        }
      }
    }


    // To play the sound
    if (isScrolling && !this.synthIsPlaying) {
      this.synthIsPlaying = true
      console.log("=============================");
      console.log("starting sound");

      // Pitch modulation function
      this.soundFreq = freqExp(this.soundDirection, this.soundBreakPt1, this.soundBreakPt2, freqMax, freqMin, scrollPos)
      this.synth.play(this.soundFreq)
    }

    // Continuously set sound frequency as scrollPos (props) changes
    this.soundFreq = freqExp(this.soundDirection, this.soundBreakPt1, this.soundBreakPt2, freqMax, freqMin, scrollPos)
    this.synth.frequency = this.soundFreq
  }

  getSoundDirectionAndBreakpoints = async () => {


    
  }


  componentDidUpdate = () => {
    const { isScrolling } = this.props

    // To stop the sound:
    if (!isScrolling && this.synthIsPlaying) {
      console.log("stopping sound");
      console.log("===========================");
      this.synthIsPlaying = false
      this.synth.stop()
      // Re-create the sound object
      this.instantiateSynth()
    }
  }


  instantiateSynth = () => {
    // This is required to replay the sound
    this.synth = new Synth(this.audioContext, 'triangle', 1200, 800)
  }


  scrollToPosition = (destPos) => {
    const {
      scrollPosition: scrollPos,
      setIsScrolling,
      setScrollDirection,
    } = this.props

    if (destPos < scrollPos) {
      setScrollDirection('backward')
    } else if (destPos > scrollPos) {
      setScrollDirection('forward')
    }

    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

    // Diff between current scrollPos and destPos
    this.scrollPosDiff = Math.abs(scrollPos - destPos)

    // Scroll to top of page when changing sections
    window.scrollTo(0, 0)

    setIsScrolling(true)
    this.req = requestAnimationFrame(() => this.handleAnimation(destPos))
  }


  handleAnimation = (destPos) => {
    const {
      scrollPosition: scrollPos,
      setScrollPosition,
      setIsScrolling
    } = this.props

    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    // To determine if animation is going forward or backward
    const directionMod = scrollPos < destPos ? 1 : -1

    // Divide by 30 for half a second per transition (60 for full second)
    const amtPerFrame = this.scrollPosDiff / 60

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
          scrollPos > breakPt[1] && scrollPos <= breakPt[4] &&
          <Menu
            scrollToBreakPoint={this.scrollToPosition}
            title='SKILLS'
            sectionColor='red'
            breakPt1={breakPt[1]}
            breakPt2={breakPt[2]}
            breakPt3={breakPt[3]}
            breakPt4={breakPt[4]}
            renderContent={renderSkills}
          />
        ) || (
          scrollPos > breakPt[4] && scrollPos <= breakPt[7] &&
          <Menu
            scrollToBreakPoint={this.scrollToPosition}
            title='PROJECTS'
            sectionColor='fuchsia'
            breakPt1={breakPt[4]}
            breakPt2={breakPt[5]}
            breakPt3={breakPt[6]}
            breakPt4={breakPt[7]}
            renderContent={renderProjects}
          />
        ) || (
          scrollPos > breakPt[7] && scrollPos <= breakPt[10] &&
          <Menu
            scrollToBreakPoint={this.scrollToPosition}
            title='EDUCATION'
            sectionColor='yellow'
            breakPt1={breakPt[7]}
            breakPt2={breakPt[8]}
            breakPt3={breakPt[9]}
            breakPt4={breakPt[10]}
            renderContent={renderEducation}
          />
        ) || (
          scrollPos > breakPt[10] && scrollPos <= breakPt[13] &&
          <Menu
            scrollToBreakPoint={this.scrollToPosition}
            title='CONTACT'
            sectionColor='cyan'
            breakPt1={breakPt[10]}
            breakPt2={breakPt[11]}
            breakPt3={breakPt[12]}
            breakPt4={breakPt[13]}
            renderContent={renderOther}
          />
        )}

        <Footer scrollTo={this.scrollToPosition}/>

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
    setScrollDirection: (direction) => {
      // 'forward' or 'backward'
      dispatch(action('SET_SCROLL_DIRECTION', { direction: direction }))
    },
  })
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
