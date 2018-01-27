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
      sectionOneStyle: {},
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
      sectionOneStyle: {
        top: (window.innerHeight / 2) - (this.sectionOneElmt.clientHeight / 2),
        left: (window.innerWidth / 2) - (this.sectionOneElmt.clientWidth / 2),
      }
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const { viewPosition: lastViewPosition } = this.props
    const { viewPosition } = nextProps

    if (viewPosition - lastViewPosition > 0 && viewPosition > this.sectionOneScrollThreshold) {
      this.setState({
        sectionOneStyle: {
          ...this.state.sectionOneStyle,
          top: this.state.sectionOneStyle.top - 3
        }
      })
    }
    else if (viewPosition - lastViewPosition < 0 && viewPosition > this.sectionOneScrollThreshold) {
      this.setState({
        sectionOneStyle: {
          ...this.state.sectionOneStyle,
          top: this.state.sectionOneStyle.top + 3
        }
      })
    }
  }

  handleScroll = (event) => {
    const { viewPosition, setViewPosition, setLastViewPosition } = this.props
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
