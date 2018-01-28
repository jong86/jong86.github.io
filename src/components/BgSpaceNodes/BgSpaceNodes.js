import React, { Component } from 'react';
import './BgSpaceNodes.css';
import SpaceNode from './SpaceNode.js'
import uuidv4 from 'uuid/v4'
import update from 'immutability-helper';

class BgSpaceNodes extends Component {
  constructor() {
    super()
    this.state = {
      spaceNodes: [],
    }
    this.timer = null
  }

  componentWillMount = () => {
    this.timer = setInterval(this.tick, 100)
  }

  tick = () => {
    this.setState(prevState => ({
      spaceNodes: prevState.spaceNodes.concat(<SpaceNode key={uuidv4()}/>)
    }))
    if (this.state.spaceNodes.length > 1000) {
      clearTimeout(this.timer)
    }
    if (Math.random() > 0.8) {
      console.log("deleting a space node");
      this.setState(prevState => ({
        spaceNodes: update(prevState.spaceNodes, {$splice: [[Math.floor(Math.random() * prevState.spaceNodes.length), 1]]})
      }))
    }
  }

  render = () => {
    return (
      <div className="bg-space-nodes">
        <div className="inner-container">
          { this.state.spaceNodes }
        </div>
      </div>
    );
  }
}

export default BgSpaceNodes;
