import { observable, action } from 'mobx';

class PlayPauseStore {

  @observable isVideoPlaying = true;

  @action toggleVideoPlaying = () => {
    this.isVideoPlaying = !this.isVideoPlaying;
  };

}

const playPauseStore = new PlayPauseStore();
export default playPauseStore;