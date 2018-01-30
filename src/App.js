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

    this.sectionTwoRef = null

    // For isScrolling detection
    this.timeoutScroll = null
    this.handleScroll = this.handleScroll.bind(this);

    // For scroll rate
    this.lastTime = null
    this.lastScrollPosition = null

    // For component animation / movement
    // (Could store these in redux store))
    this.scrollBreakpoints = [225, 800, 1200]
  }


  componentDidMount = () => {
    // Scroll to top of page on load:
    window.onbeforeunload = () => window.scrollTo(0,0)

    // Add scroll listener
    window.addEventListener('scroll', throttle(this.handleScroll, 8));

    this.setState({
      // Center Section One on page load
      sectionOneStyle: {
        top: '50%',
        opacity: 1.0,
      },
      sectionTwoStyle: {
        top: '125%',
        opacity: 0.0,
      }
    })
  }


  componentWillReceiveProps = (nextProps) => {
    const { scrollPosition } = nextProps
    const { scrollBreakpoints } = this

    /*========================
      Section One Animation
    ========================*/
    if (scrollPosition <= scrollBreakpoints[1]) {

      // Regular behavior
      if (scrollPosition > this.scrollBreakpoints[0]) {
        this.setState({
          sectionOneStyle: {
            top: this.moveComponentVertically('50%', scrollBreakpoints[0], scrollBreakpoints[1]),
            opacity: this.fadeOpacity('out', this.scrollBreakpoints[0], scrollBreakpoints[1]),
          }
        })
      }

      // Fix style if scrolled too fast
      if (scrollPosition <= this.scrollBreakpoints[0]) {
        this.setState({
          sectionOneStyle: {
            top: '50%',
            opacity: 1.0,
          },
        })
      }

      // Fix opacity if scrolled too fast
      this.setState({
        sectionTwoStyle: {
          opacity: 0.0,
        }
      })
    }


    /*========================
      Section Two Animation
    ========================*/
    if (scrollPosition > scrollBreakpoints[1] && scrollPosition <= scrollBreakpoints[2]) {

      // Regular behavior
      this.setState({
        sectionOneStyle: {
          top: "-25%", // Positioned out of view
          opacity: 0.0,
        },
        sectionTwoStyle: {
          top: this.moveComponentVertically('150%', scrollBreakpoints[1], scrollBreakpoints[2]),
          opacity: this.fadeOpacity('in', scrollBreakpoints[1], scrollBreakpoints[2]),
        }
      })
    }

    // Fix style if scrolled too fast
    if (scrollPosition > scrollBreakpoints[2]) {
      this.setState({
        sectionTwoStyle: {
          top: "50%",
          opacity: 1.0,
        }
      })
    }
  }

  moveComponentVertically = (initialPct, breakpoint1, breakpoint2) => {
    const { scrollPosition } = this.props
    let int = parseInt(initialPct)
    int -= ((scrollPosition - breakpoint1) / (breakpoint2 - breakpoint1)) * 100
    // console.log('int:', int, scrollPosition, breakpoint2);
    return int + '%'
  }

  fadeOpacity = (direction, breakpoint1, breakpoint2) => {
    // Fades opacity in/out towards specified scrollPosition breakpoint
    const { scrollPosition } = this.props

    switch (direction) {
      case 'out':
        return 1 - ((((scrollPosition - breakpoint1) / (breakpoint2 - breakpoint1))) ** 2)
      case 'in':
        return (scrollPosition - breakpoint1) / (breakpoint2 - breakpoint1)
      default:
        return
    }
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


/*=========
  Redux
=========*/
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
