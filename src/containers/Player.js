import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import ControlBar from '../components/controlBar';
import StartScreen from './startScreen';
import PlayScreen from './playScreen';
import PauseScreen from './pauseScreen';
import EndScreen from './endScreen';
import CONSTANTS from '../constants/constants';

@inject('ScreenStore', 'PlayerStore')
@observer
class Player extends Component {
  render() {
    const { ScreenStore} = this.props;

    let activeScreen = null;
    switch (ScreenStore.activeScreen) {
      case CONSTANTS.screens.startScreen:
        activeScreen = <StartScreen />;
        break;
      case CONSTANTS.screens.playScreen:
        activeScreen = <PlayScreen />;
        break;
      case CONSTANTS.screens.pauseScreen:
        activeScreen = <PauseScreen />;
        break;
      case CONSTANTS.screens.endScreen:
        activeScreen = <EndScreen />;
        break;
      default:
        break;
    }

    const style = {
      'background': `url(${this.props.PlayerStore.promoImage}) center center no-repeat`,
      'backgroundSize': 'contain'
    };
    return (
      <div className="player" style={style}>
        <div className="screen">
          {activeScreen}
          <ControlBar />
        </div>
      </div>
    );

  }
};

export default Player;
