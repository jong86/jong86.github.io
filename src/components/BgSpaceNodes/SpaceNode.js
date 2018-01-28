import React, { Component } from 'react';
import './BgSpaceNodes.css';

class SpaceNode extends Component {
  constructor() {
    super()
    this.state = {
      inlineStyle: {},
      numConnections: 0,
    }
  }

  componentWillMount = () => {
    const size = this.setSize()
    const { top, left } = this.setPosition()

    this.setState({
      inlineStyle: {
        top: top,
        left: left,
        width: size,
        height: size,
        backgroundColor: this.setBackgroundColorClass()
      }
    })
  }

  setBackgroundColorClass = () => {

  }

  setSize = () => {
    return Math.ceil(Math.random() * 3)
  }

  setPosition = () => {
    return {
      top: Math.floor(Math.random() * window.innerHeight),
      left: Math.floor(Math.random() * window.innerWidth),
    }
  }

  render = () => {
    return (
      <div className="space-node" style={this.state.inlineStyle}>
      </div>
    );
  }
}

export default SpaceNode;
