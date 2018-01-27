import React, { Component } from 'react'
import './Plate.css'
import { connect } from 'react-redux'
import AngleDown from 'react-icons/lib/fa/angle-down';

class Plate extends Component {
  constructor() {
    super()
    this.state = {
      obfuscatedText: '',
      plateHeight: {},
    }
    this.plateRef = null
    this.realText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis at consectetur lorem donec massa sapien. Nisi scelerisque eu ultrices vitae. Id diam vel quam elementum pulvinar etiam non. Accumsan tortor posuere ac ut consequat semper viverra nam libero.`
    this.chars = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`
  }

  componentWillMount = () => {
    this.setState({
      plateHeight: { height: this.props.viewPosition + 192},
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const { viewPosition: lastViewPosition } = this.props
    const { viewPosition } = nextProps

    if ((viewPosition - lastViewPosition > 1 || lastViewPosition - viewPosition > 1) && viewPosition < 160) {
      let obfuscatedText = ''
      const lenChars = this.chars.length
      this.realText.split('').forEach(letter => {
        obfuscatedText += this.chars[Math.floor(Math.random() * lenChars)]
      })

      this.setState({
        obfuscatedText: obfuscatedText,
        plateHeight: { height: viewPosition + 192},
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
        <AngleDown size={48}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    viewPosition: state.viewPosition,
    lastViewPosition: state.lastViewPosition,
  }
}

Plate = connect(mapStateToProps)(Plate)

export default Plate
