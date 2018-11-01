import { observable, action, computed } from 'mobx';

import CONSTANTS from '../constants/constants';

class PlayerStore {

  @observable mb = {};
  @observable id = ''; //video tag id
  @observable promoImage = '';

  @action setMb = (mb) => {
    this.mb = mb;
  };

  @action setId = (id) => {
    this.id = id;
  };

  @action setPromoImage = (imgUrl) => {
    this.promoImage = imgUrl;
  };
}

const playerStore = new PlayerStore();
export default playerStore;