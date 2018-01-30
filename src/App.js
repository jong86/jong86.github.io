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
    this.sectionOneScrollBreakpoint = 225
    this.sectionOneVerticalCenter = null

    this.sectionTwoRef = null
    this.sectionTwoVerticalCenter = null

    // For isScrolling detection
    this.timeoutScroll = null
    this.handleScroll = this.handleScroll.bind(this);

    // For scroll rate
    this.lastTime = null
    this.lastScrollPosition = null

    // For main component animation / movement
    this.sectionBreakpoints = [800, 1200]
  }


  componentDidMount = () => {
    // Scroll to top of page on load:
    window.onbeforeunload = () => window.scrollTo(0,0)

    // Add scroll listener
    window.addEventListener('scroll', throttle(this.handleScroll, 32));

    this.setState({
      // Center Section One on page load
      sectionOneStyle: {
        top: (window.innerHeight / 2) - (this.sectionOneRef.clientHeight / 2),
        opacity: 1.0,
      },
      sectionTwoStyle: {
        top: (window.innerHeight / 2) - (this.sectionTwoRef.clientHeight / 2),
        opacity: 0.0,
      }
    })

    this.sectionOneVerticalCenter = (window.innerHeight / 2) - (this.sectionOneRef.clientHeight / 2)
  }


  componentWillReceiveProps = (nextProps) => {
    const { scrollPosition: lastScrollPosition } = this.props
    const { scrollPosition } = nextProps
    const { sectionBreakpoints } = this


    /*=======================
      SECTION ONE MOVEMENT
    =======================*/
    if (scrollPosition < sectionBreakpoints[0]) {

      // Re-centers Section One under breakpoint, because of bug with scrolling really fast
      if (scrollPosition < this.sectionOneScrollBreakpoint) {
        this.setState({
          sectionOneStyle: {
            top: this.sectionOneVerticalCenter,
            opacity: 1.0,
          },
        })
      }

      // Regular scrolling behavior
      if (Math.abs(scrollPosition - lastScrollPosition) > 0 && scrollPosition > this.sectionOneScrollBreakpoint) {

        this.setState({
          sectionOneStyle: {
            top: this.moveSectionOneVertically(),
            opacity: this.fadeOpacity('out', this.sectionOneScrollBreakpoint, sectionBreakpoints[0]),
          }
        })
      }

      this.setState({
        sectionTwoStyle: {
          opacity: 0.0,
        }
      })
    }



    /*=======================
      SECTION TWO MOVEMENT
    =======================*/
    if (scrollPosition >= sectionBreakpoints[0] && scrollPosition <= sectionBreakpoints[1]) {

      this.setState({
        sectionOneStyle: {
          opacity: 0.0,
        },
        sectionTwoStyle: {
          top: this.moveComponentVerticallyIn(this.sectionTwoRef),
          opacity: this.fadeOpacity('in', sectionBreakpoints[0], sectionBreakpoints[1]),
        }
      })
    }
  }

  fadeOpacity = (direction, breakpoint1, breakpoint2) => {
    // Fades opacity in/out towards specified scrollPosition breakpoint

    const { scrollPosition } = this.props
    console.log((scrollPosition - breakpoint1) / (breakpoint2 - breakpoint1));

    switch (direction) {
      case 'out':
        return 1 - ((((scrollPosition - breakpoint1) / (breakpoint2 - breakpoint1))) ** 2)
      case 'in':
        return (scrollPosition - breakpoint1) / (breakpoint2 - breakpoint1)
      default:
        return
    }
  }

  moveSectionOneVertically = () => {
    return this.sectionOneVerticalCenter - (this.props.scrollPosition - this.sectionOneScrollBreakpoint)
  }

  moveComponentVerticallyIn = (ref) => {
    return this.getComponentTopAtBottom(ref) - (this.props.scrollPosition)
  }

  getComponentTopAtBottom = (ref) => {
    return window.innerHeight + ref.clientHeight
  }

  handleScroll = (event) => {
    const { setScrollPosition, setIsScrolling, scrollPosition } = this.props

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

  render = () => {
    const { scrollPosition } = this.props
    const { sectionBreakpoints } = this

    return (
      <div className="App">
        <BgSpaceNodes/>

        <div
          className="section-one"
          style={this.state.sectionOneStyle}
          ref={(ref) => { this.sectionOneRef = ref }}
        >
          <Summary/>
        </div>

        <div
          className="section-two"
          style={this.state.sectionTwoStyle}
          ref={(ref) => { this.sectionTwoRef = ref }}
        >
          <Skills/>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    scrollPosition: state.scrollPosition,
    isScrolling: state.isScrolling,
    audioContext: state.audioContext,
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
