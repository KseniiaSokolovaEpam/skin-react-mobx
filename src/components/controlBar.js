import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Icon from './icon';
import CONSTANTS from '../constants/constants';
import PlayPauseStore from '../stores/PlayPauseStore';
import ACTIONS from '../actions/main';

@inject('PlayerStore', 'ScreenStore')
@observer
class controlBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick = (event) => {
    event.preventDefault();
    ACTIONS.togglePlayPause();
  };

  render() {
    const iconName = PlayPauseStore.isVideoPlaying ?  CONSTANTS.play : CONSTANTS.pause;

    return (
      <div className="control-bar">
        <Icon iconName={iconName} onClick = {(event) => this.handleClick(event)}/>
      </div>
    );

  }
}

export default controlBar;