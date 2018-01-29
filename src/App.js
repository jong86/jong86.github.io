import React, { Component } from 'react';
import './App.css';

import BgSpaceNodes from './components/BgSpaceNodes/BgSpaceNodes.js'
import Summary from './components/Summary/Summary.js'
import Skills from './components/Skills/Skills.js'

import action from './redux/action.js'
import { connect } from 'react-redux'

import throttle from 'lodash.throttle'


class App extends Component {
  constructor() {
    super()
    this.state = {
      sectionOneStyle: {},
      sectionTwoStyle: {},
    }
    this.sectionOneRef = null
    this.sectionOneScrollThreshold = 225
    this.sectionOneVerticalCenter = null

    this.sectionTwoRef = null

    // For isScrolling detection
    this.timeoutScroll = null
    this.handleScroll = this.handleScroll.bind(this);

    // For scroll rate
    this.lastTime = null
    this.lastViewPosition = null

    // For main component animation / movement
    this.sectionBreakpoints = [800]
  }


  componentDidMount = () => {
    // Scroll to top of page on load:
    window.onbeforeunload = () => window.scrollTo(0,0)

    // Add scroll listener
    window.addEventListener('scroll', throttle(this.handleScroll, 1));

    this.setState({
      // Center Section One on page load
      sectionOneStyle: {
        top: (window.innerHeight / 2) - (this.sectionOneRef.clientHeight / 2),
        opacity: 1.0,
      }
    })

    this.sectionOneVerticalCenter = (window.innerHeight / 2) - (this.sectionOneRef.clientHeight / 2)
  }


  componentWillReceiveProps = (nextProps) => {
    const { viewPosition: lastViewPosition } = this.props
    const { viewPosition } = nextProps
    const { sectionBreakpoints } = this


    /*=======================
      SECTION ONE MOVEMENT
    =======================*/
    if (viewPosition < sectionBreakpoints[0]) {

      // Re-centers Section One under threshold, because of bug with scrolling really fast
      if (viewPosition < this.sectionOneScrollThreshold) {
        this.setState(prevState => ({
          sectionOneStyle: {
            top: this.sectionOneVerticalCenter,
            opacity: 1.0,
          }
        }))
      }

      // Regular scrolling behavior
      if (Math.abs(viewPosition - lastViewPosition) > 0 &&
        viewPosition > this.sectionOneScrollThreshold &&
        this.sectionOneRef) {

        this.setState(prevState => ({
          sectionOneStyle: {
            top: this.moveSectionOneVertically(),
            opacity: this.fadeOpacity(),
          }
        }))
      }
    }


    /*=======================
      SECTION TWO MOVEMENT
    =======================*/
    if (viewPosition >= sectionBreakpoints[0]) {
      this.setState(prevState => ({
        sectionTwoStyle: {
          top: this.moveSectionOneVertically(),
          opacity: this.fadeOpacity(),
        }
      }))
    }

  }

  fadeOpacity = () => {
    return 1 - ((this.props.viewPosition / 800) ** 2)
  }

  moveSectionOneVertically = () => {
    return this.sectionOneVerticalCenter - (this.props.viewPosition - this.sectionOneScrollThreshold)
  }

  getComponentVerticalCenter = (ref) => {
    return (window.innerHeight / 2) - (ref.clientHeight / 2)
  }

  moveComponentVertically = (ref) => {

  }


  handleScroll = (event) => {
    const { setViewPosition, setIsScrolling, viewPosition } = this.props

    setViewPosition(document.documentElement.scrollTop)

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
      this.lastViewPosition = viewPosition
    }
    const scrollRate = (
      (Math.abs(viewPosition - this.lastViewPosition) / (now - this.lastTime)) + 40
    )
    if (scrollRate) setScrollRate(scrollRate)
  }

  render = () => {
    const { viewPosition } = this.props
    const { sectionBreakpoints } = this

    return (
      <div className="App">
        <BgSpaceNodes/>

        { viewPosition < sectionBreakpoints[0] &&
          <div
            className="section-one"
            style={this.state.sectionOneStyle}
            ref={(ref) => { this.sectionOneRef = ref }}
          >
            <Summary/>
          </div>
        }

        { viewPosition >= sectionBreakpoints[0] &&
          <div
            className="section-two"
            style={this.state.sectionTwoStyle}
            ref={(ref) => { this.sectionTwoRef = ref }}
          >
            <Skills/>
          </div>
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    viewPosition: state.viewPosition,
    isScrolling: state.isScrolling,
    audioContext: state.audioContext,
  }
}

function mapDispatchToProps(dispatch) {
  return({
    setViewPosition: (viewPosition) => {
      dispatch(action('SET_VIEW_POSITION', { viewPosition: viewPosition }))
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
