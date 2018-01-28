import React, { Component } from 'react';
import './App.css';

import Plate from './components/Plate/Plate.js'
import BgSpaceNodes from './components/BgSpaceNodes/BgSpaceNodes.js'

import action from './redux/action.js'
import { connect } from 'react-redux'

import throttle from 'lodash.throttle'


class App extends Component {
  constructor() {
    super()
    this.state = {
      sectionOneStyle: {},
    }
    this.sectionOneElmt = null
    this.sectionOneScrollThreshold = 175
    this.sectionOneVerticalCenter = null
  }

  componentDidMount = () => {
    // Scroll to top of page on load:
    window.onbeforeunload = () => window.scrollTo(0,0)

    // Add scroll listener
    window.addEventListener('scroll', throttle(this.handleScroll, 1));

    this.setState({
      // Center Section One on page load
      sectionOneStyle: {
        top: (window.innerHeight / 2) - (this.sectionOneElmt.clientHeight / 2),
        left: (window.innerWidth / 2) - (this.sectionOneElmt.clientWidth / 2),
      }
    })
    this.sectionOneVerticalCenter = (window.innerHeight / 2) - (this.sectionOneElmt.clientHeight / 2)
  }

  componentWillReceiveProps = (nextProps) => {
    const { viewPosition: lastViewPosition } = this.props
    const { viewPosition } = nextProps


    /* Edge case fix:
      Resets to center at viewPosition = 0, because bug with scrolling really fast */
    if (viewPosition < this.sectionOneScrollThreshold || viewPosition < this.sectionOneScrollThreshold) {
      this.setState(prevState => ({
        sectionOneStyle: {
          ...prevState.sectionOneStyle,
          top: this.sectionOneVerticalCenter,
        }
      }))
    }

    // When scrolling down
    if (viewPosition - lastViewPosition > 0 && viewPosition > this.sectionOneScrollThreshold) {
      this.sectionOneVerticalCenter = (window.innerHeight / 2) - (this.sectionOneElmt.clientHeight / 2)
      this.setState(prevState => ({
        sectionOneStyle: {
          ...prevState.sectionOneStyle,
          top: this.sectionOneVerticalCenter - (viewPosition - this.sectionOneScrollThreshold),
        }
      }))
    }

    // When scrollig up
    else if (viewPosition - lastViewPosition < 0 && this.state.sectionOneStyle.top < this.sectionOneVerticalCenter) {
      this.sectionOneVerticalCenter = (window.innerHeight / 2) - (this.sectionOneElmt.clientHeight / 2)
      this.setState(prevState => ({
        sectionOneStyle: {
          ...prevState.sectionOneStyle,
          top: this.sectionOneVerticalCenter - (viewPosition - this.sectionOneScrollThreshold),
        }
      }))
    }
  }

  handleScroll = (event) => {
    event.preventDefault()
    const { setViewPosition } = this.props
    setViewPosition(document.documentElement.scrollTop)
  }

  render = () => {
    return (
      <div className="App">
        <BgSpaceNodes/>
        <div
          className="section-one"
          style={this.state.sectionOneStyle}
          ref={(el) => { this.sectionOneElmt = el }}
        >
          <Plate/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    viewPosition: state.viewPosition,
  }
}

function mapDispatchToProps(dispatch) {
  return({
    setViewPosition: (viewPosition) => {
      dispatch(action('SET_VIEW_POSITION', { viewPosition: viewPosition }))
    },
  })
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
