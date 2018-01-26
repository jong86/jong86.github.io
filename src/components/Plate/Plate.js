import React, { Component } from 'react';
import './Plate.css';

import { connect } from 'react-redux'

class Plate extends Component {
  render() {
    const inlineStyle = {
      height: this.props.viewPosition + 100
    }

    return (
      <div
        className="plate no-select"
        style={inlineStyle}
      >
        [ Plate ]
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

export default Plate;
