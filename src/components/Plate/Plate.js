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
    this.realText = `I'm a 31 year old web developer with a background including construction, oil rigs, and university. I've dabbled with making web pages since I was in high school, and I've recently decided to make the career switch into something I have more passion for. Other than coding, in my spare time I enjoy playing guitar and producing music.`
    this.chars = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`

    this.textThreshold = 160
  }

  componentWillMount = () => {
    this.setState({
      plateHeight: { height: this.props.viewPosition + 192},
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const { viewPosition: lastViewPosition } = this.props
    const { viewPosition } = nextProps

    console.log(Math.random() );

    if ((Math.abs(viewPosition - lastViewPosition) > 0) && (viewPosition < this.textThreshold)) {
      let obfuscatedText = ''
      const lenChars = this.chars.length

      this.realText.split('').forEach(letter => {
        if (Math.random() > (viewPosition / this.textThreshold)) {
          // Evaluates as true more often as viewPosition increases
          obfuscatedText += this.chars[Math.floor(Math.random() * lenChars)]
        } else {
          obfuscatedText += letter
        }
      })

      this.setState({
        obfuscatedText: obfuscatedText,
        plateHeight: { height: viewPosition + 192},
      })
    }
  }

  render = () => {
    const textWordBreak = {
      wordBreak: this.props.viewPosition < this.textThreshold / 1.35 ? "break-all" : "break-word"
    }

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
        <div className="text" style={textWordBreak}>
          {this.props.viewPosition < this.textThreshold ? this.state.obfuscatedText : this.realText}
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
