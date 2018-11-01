import { observable, action, computed } from 'mobx';

import CONSTANTS from '../constants/constants';
const screenList = [CONSTANTS.screens.startScreen, CONSTANTS.screens.playScreen, CONSTANTS.screens.pauseScreen, CONSTANTS.screens.endScreen];

class ScreenStore {

  @observable activeScreen = CONSTANTS.screens.startScreen;

  @action setActiveScreen = (screen) => {
    this.activeScreen = screen;
  };

  @computed get screenListLenght() {
    return screenList.length;
  };
}

const screenStore = new ScreenStore();
export default screenStore;