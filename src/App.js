import React, { Component } from 'react';
import './App.css';

import Plate from './components/Plate/Plate.js'
import BgSpaceNodes from './components/BgSpaceNodes/BgSpaceNodes.js'

import action from './redux/action.js'
import { connect } from 'react-redux'


class App extends Component {
  constructor() {
    super()
    this.state = {
      sectionOnePos: {},
    }
    this.sectionOneElmt = null
    this.sectionOneScrollThreshold = 175
  }

  componentDidMount = () => {
    // Scroll to top of page on load:
    window.onbeforeunload = () => window.scrollTo(0,0)

    // Add scroll listener
    window.addEventListener('scroll', this.handleScroll);

    this.setState({
      // Center Section One on page load
      sectionOnePos: {
        top: (window.innerHeight / 2) - (this.sectionOneElmt.clientHeight / 2),
        left: (window.innerWidth / 2) - (this.sectionOneElmt.clientWidth / 2),
      }
    })
  }

  componentWillReceiveProps = () => {
    const { viewPosition, lastViewPosition } = this.props

    // Move Section One up, if user scrolls down, when scroll position is past specified point
    if (viewPosition - lastViewPosition > 1 && viewPosition > this.sectionOneScrollThreshold) {
      this.setState({
        sectionOnePos: {
          top: this.state.sectionOnePos.top - 5,
          left: this.state.sectionOnePos.left,
        }
      })

    // Move Section One back down, if user scrolls up, when scroll position is past specified point
    } else if (lastViewPosition - viewPosition > 1 && viewPosition > this.sectionOneScrollThreshold) {
      if (this.state.sectionOnePos.top >= (window.innerHeight / 2) - (this.sectionOneElmt.clientHeight / 2)) {
        // Don't move if it's already vertically centered
        return
      } else {
        // Move it down if it's above center
        this.setState({
          sectionOnePos: {
            top: this.state.sectionOnePos.top + 5,
            left: this.state.sectionOnePos.left,
          }
        })
      }
    }
  }

  handleScroll = (event) => {
    const { viewPosition, lastViewPosition, setViewPosition, setLastViewPosition } = this.props
    setViewPosition(document.documentElement.scrollTop)

    if (viewPosition - lastViewPosition > 1 || lastViewPosition - viewPosition > 1) {
      setLastViewPosition(viewPosition)
    }
  }

  render = () => {
    return (
      <div className="App">
        <BgSpaceNodes/>
        <div
          className="section-one"
          style={this.state.sectionOnePos}
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
    lastViewPosition: state.lastViewPosition,
  }
}

function mapDispatchToProps(dispatch) {
  return({
    setViewPosition: (viewPosition) => {
      dispatch(action('SET_VIEW_POSITION', { viewPosition: viewPosition }))
    },
    setLastViewPosition: (lastViewPosition) => {
      dispatch(action('SET_LAST_VIEW_POSITION', { lastViewPosition: lastViewPosition }))
    },
  })
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
