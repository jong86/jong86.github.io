import React, { Component } from 'react';
import './App.css';

import Name from './components/Name/Name.js'
import Plate from './components/Plate/Plate.js'
import BgSpaceNodes from './components/BgSpaceNodes/BgSpaceNodes.js'

import action from './redux/action.js'
import { connect } from 'react-redux'


class App extends Component {
  constructor() {
    super()
    this.lastScrollTop = 0
  }

  componentDidMount = () => {
    window.scrollTop = 0
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    console.log("scroll event:", event);

    const { modifyViewPosition } = this.props
    const currentScrollTop = document.documentElement.scrollTop
    // currentScrollTop > this.lastScrollTop ? modifyViewPosition(2) : modifyViewPosition(-2)
    modifyViewPosition(currentScrollTop - this.lastScrollTop)
    this.lastScrollTop = currentScrollTop
  }

  render() {
    const positionSectionOne = {
      top: window.innerHeight / 2,
      left: window.innerWidth / 2,
    }

    return (
      <div className="App">
        <BgSpaceNodes/>
        <div className="section-one" style={positionSectionOne}>
          <Name/>
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
