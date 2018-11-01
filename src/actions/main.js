import CONSTANTS from '../constants/constants';
import PlayPauseStore from '../stores/PlayPauseStore';
import PlayerStore from '../stores/PlayerStore';
import ScreenStore from '../stores/ScreenStore';

const togglePlayPause = () => {
  const activeScreen = ScreenStore.activeScreen;
  let nextScreen = activeScreen;
  switch (activeScreen) {
    case CONSTANTS.screens.startScreen:
      nextScreen = CONSTANTS.screens.playScreen;
      PlayerStore.mb.publish(window.OO.EVENTS.INITIAL_PLAY, Date.now(), false);
      break;
    case CONSTANTS.screens.pauseScreen:
      nextScreen = CONSTANTS.screens.playScreen;
      PlayerStore.mb.publish(window.OO.EVENTS.PLAY);
      break;
    case CONSTANTS.screens.playScreen:
      nextScreen = CONSTANTS.screens.pauseScreen;
      PlayerStore.mb.publish(window.OO.EVENTS.PAUSE);
      break;
    case CONSTANTS.screens.endScreen:
      nextScreen = CONSTANTS.screens.playScreen;
      PlayerStore.mb.publish(window.OO.EVENTS.REPLAY);
    default:
      break;
  }
  ScreenStore.setActiveScreen(nextScreen);
  PlayPauseStore.toggleVideoPlaying();
};

const actions = {
  togglePlayPause: togglePlayPause
};

export default actions;