import React, { Component } from 'react'
import './Plate.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down';

class Plate extends Component {
  constructor() {
    super()
    this.state = {
      loopingColorAmt: 255,
    }

    this.loopColor = this.loopColor.bind(this)
  }

  componentWillMount() {
    window.requestAnimationFrame(this.loopColor)
  }

  loopColor() {
    this.setState({loopingColorAmt: this.state.loopingColorAmt -= 2}, () => {
      if (this.state.loopingColorAmt < 32) {
        this.setState({loopingColorAmt: 192})
      }
    })
    window.requestAnimationFrame(this.loopColor)
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
        <div className="hr"/>
        </div>
        <div className="menu">
          <div className="menu-footer">
            <AngleDown size={48} color={`rgb(${this.state.loopingColorAmt}, 255, ${this.state.loopingColorAmt})`}/>
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
