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
      lastViewPosition: 0
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

  componentWillUpdate = () => {
    // Move Section One up, if user scrolls down, when scroll position is past specified point
    if (this.props.viewPosition - this.state.lastViewPosition > 1 && this.props.viewPosition > this.sectionOneScrollThreshold) {
      this.setState({
        sectionOnePos: {
          top: this.state.sectionOnePos.top - 5,
          left: this.state.sectionOnePos.left,
        }
      })

    // Move Section One back down, if user scrolls up, when scroll position is past specified point
    } else if (this.state.lastViewPosition - this.props.viewPosition > 1 && this.props.viewPosition > this.sectionOneScrollThreshold) {
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
    const { modifyViewPosition } = this.props
    const { scrollTop } = document.documentElement
    modifyViewPosition(scrollTop - this.state.lastViewPosition)
    this.setState({
      lastViewPosition: this.props.viewPosition
    })
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
  }
}

function mapDispatchToProps(dispatch) {
  return({
    modifyViewPosition: (valueChange) => {
      dispatch(action('MODIFY_VIEW_POSITION', { valueChange: valueChange }))
    },
  })
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
