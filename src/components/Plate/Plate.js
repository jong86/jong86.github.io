import React, { Component } from 'react'
import './Plate.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down';

class Plate extends Component {
  constructor() {
    super()
    this.state = {
      loopingColorAmt: 255,
      lastViewPosition: 0,
      obfuscatedText: '',
      plateHeight: {},
    }
    this.plateRef = null
    this.realText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis at consectetur lorem donec massa sapien. Nisi scelerisque eu ultrices vitae. Id diam vel quam elementum pulvinar etiam non. Accumsan tortor posuere ac ut consequat semper viverra nam libero.`
    this.chars = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`

    this.loopColor = this.loopColor.bind(this)
  }

  componentWillMount = () => {
    window.requestAnimationFrame(this.loopColor)

    this.setState({
      lastViewPosition: this.props.viewPosition,
      plateHeight: { height: this.props.viewPosition + 192},
    })
  }

  loopColor = () => {
    this.setState({loopingColorAmt: this.state.loopingColorAmt -= 2}, () => {
      if (this.state.loopingColorAmt < 0) {
        this.setState({loopingColorAmt: 255})
      }
    })
    window.requestAnimationFrame(this.loopColor)
  }

  componentWillUpdate = () => {
    if ((this.props.viewPosition - this.state.lastViewPosition > 1 ||
        this.state.lastViewPosition - this.props.viewPosition > 1) && this.props.viewPosition < 160) {
      let obfuscatedText = ''
      const lenChars = this.chars.length
      this.realText.split('').forEach(letter => {
        obfuscatedText += this.chars[Math.floor(Math.random() * lenChars)]
      })
      this.setState({
        lastViewPosition: this.props.viewPosition,
        obfuscatedText: obfuscatedText,
        plateHeight: { height: this.props.viewPosition + 192},
      })
    }
  }

  render = () => {
    return (
      <div className="plate no-select" style={this.state.plateHeight}> 
        <div className="heading">
          <div className="name">
            Jon Gaspar
          </div>
          <div className="title">
            WEB DEVELOPER
          </div>
        </div>
        <div className="text">
          {this.props.viewPosition < 160 ? this.state.obfuscatedText : this.realText}
        </div>
        <AngleDown size={48} color={`rgb(${this.state.loopingColorAmt}, 255, ${this.state.loopingColorAmt})`}/>
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
