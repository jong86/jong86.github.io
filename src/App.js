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
    this.lastScrollTop = 0
    this.sectionOneElmt = null
  }

  componentDidMount = () => {
    window.scrollTop = 0
    window.addEventListener('scroll', this.handleScroll);

    this.setState({
      sectionOnePos: {
        top: (window.innerHeight / 2) - (this.sectionOneElmt.clientHeight / 2),
        left: (window.innerWidth / 2) - (this.sectionOneElmt.clientWidth / 2),
      }
    })
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    // console.log("scroll event:", event);

    const { modifyViewPosition } = this.props
    const currentScrollTop = document.documentElement.scrollTop
    modifyViewPosition(currentScrollTop - this.lastScrollTop)
    this.lastScrollTop = currentScrollTop
  }

  render() {
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
    );
  }
}

function mapDispatchToProps(dispatch) {
  return({
    modifyViewPosition: (valueChange) => {
      dispatch(action('MODIFY_VIEW_POSITION', { valueChange: valueChange }))
    },
  })
}

App = connect(null, mapDispatchToProps)(App)

export default App;
