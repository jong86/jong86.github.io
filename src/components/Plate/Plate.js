import React, { Component } from 'react'
import './Plate.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down';

class Plate extends Component {
  constructor() {
    super()
    this.state = {
      caretColorBlueAmt: 255,
      caretColorBlueLoopDirection: 'down',
    }

    this.loopCaretColor = this.loopCaretColor.bind(this)
  }

  componentWillMount() {
    window.requestAnimationFrame(this.loopCaretColor)
  }

  loopCaretColor() {
    console.log("called here", this.state.caretColorBlueAmt);

    if (this.state.caretColorBlueLoopDirection === 'down') {
      this.setState({caretColorBlueAmt: this.state.caretColorBlueAmt -= 4})
    } else {
      this.setState({caretColorBlueAmt: this.state.caretColorBlueAmt += 16})
    }

    if (this.state.caretColorBlueAmt < 30) {
      this.setState({caretColorBlueLoopDirection: 'up'})
    } else if (this.state.caretColorBlueAmt > 254) {
      this.setState({caretColorBlueLoopDirection: 'down'})
    }

    window.requestAnimationFrame(this.loopCaretColor)
  }

  render() {
    const plateHeight = {
      height: this.props.viewPosition + 64
    }

    return (
      <div className="plate no-select" style={plateHeight}>
        <div className="heading">
          <div className="name">
            Jon Gaspar
          </div>
          <div className="title">
            WEB DEVELOPER
          </div>
        </div>
        <div className="menu">
          <div className="menu-footer">
            <AngleDown size={48} color={`rgb(237, 255, ${this.state.caretColorBlueAmt}`}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    viewPosition: state.viewPosition,
  }
}

Plate = connect(mapStateToProps)(Plate)

export default Plate
