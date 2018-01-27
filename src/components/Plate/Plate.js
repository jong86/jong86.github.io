import React, { Component } from 'react'
import './Plate.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down';

class Plate extends Component {
  constructor() {
    super()
    this.state = {
      caretSingleColorAmt: 255,
    }

    this.loopCaretColor = this.loopCaretColor.bind(this)
  }

  componentWillMount() {
    window.requestAnimationFrame(this.loopCaretColor)
  }

  loopCaretColor() {
    this.setState({caretSingleColorAmt: this.state.caretSingleColorAmt -= 2}, () => {
      if (this.state.caretSingleColorAmt < 32) {
        this.setState({caretSingleColorAmt: 192})
      }
    })
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
            <AngleDown size={48} color={`rgb(${this.state.caretSingleColorAmt}, 255, ${this.state.caretSingleColorAmt})`}/>
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
