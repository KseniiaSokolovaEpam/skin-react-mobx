import React, { Component } from 'react';
import PropTypes from "prop-types";

class Icon extends Component {
  render() {
    return (
      <span className="icon" onClick={this.props.onClick}>
        {this.props.iconName}
      </span>
    );

  }
}

Icon.propTypes = {
  iconName: PropTypes.string,
  onClick: PropTypes.func
};

export default Icon;