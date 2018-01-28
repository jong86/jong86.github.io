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
    this.sectionOneScrollThreshold = 275
    this.sectionOneVerticalCenter = null
  }

  componentDidMount = () => {
    // Scroll to top of page on load:
    window.onbeforeunload = () => window.scrollTo(0,0)

    // Add scroll listener
    window.addEventListener('scroll', throttle(this.handleScroll, 16));

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


    /*
      Box still stopping at higher point than normal

      TO DO: Maybe make a scroll-end event??
    */

    if (viewPosition < this.sectionOneScrollThreshold) {
      console.log("setting to vertical center")
      this.setState({
        sectionOneStyle: {
          ...this.state.sectionOneStyle,
          top: this.sectionOneVerticalCenter,
        }
      })
    }

    if (viewPosition - lastViewPosition > 0 && viewPosition > this.sectionOneScrollThreshold) {
      // console.log("moving up");
      this.setState({
        sectionOneStyle: {
          ...this.state.sectionOneStyle,
          top: this.state.sectionOneStyle.top - 20
        }
      })
    }
    else if (viewPosition - lastViewPosition < 0 && this.state.sectionOneStyle.top < this.sectionOneVerticalCenter) {
      console.log("moving down");
      this.setState({
        sectionOneStyle: {
          ...this.state.sectionOneStyle,
          top: this.state.sectionOneStyle.top + 20
        }
      })
    }


    console.log("viewPosition", viewPosition)
    console.log("this.sectionOneScrollThreshold", this.sectionOneScrollThreshold)
    console.log("this.sectionOneVerticalCenter", this.sectionOneVerticalCenter)
    console.log("this.state.sectionOneStyle.top", this.state.sectionOneStyle.top);
    console.log("-----------------------------")

  }

  handleScroll = (event) => {
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
