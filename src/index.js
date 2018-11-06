import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

import Player from './containers/Player';

import { Provider } from 'mobx-react';
import PlayerStore from './stores/PlayerStore';
import ScreenStore from './stores/ScreenStore';
import PlayPauseStore from './stores/PlayPauseStore';

import CONSTANTS from './constants/constants';

if (!window.OO) {
  window.OO = {};
}

const OO = window.OO;

OO.plugin('Html5Skin', function(OO) {
  const Html5Skin = function(mb, id) {
    PlayerStore.setMb(mb);
    PlayerStore.setId(id);
    this.init();

  };

  Html5Skin.prototype = {
    init: function() {
      if (PlayerStore.mb) {
        PlayerStore.mb.subscribe(OO.EVENTS.PLAYER_CREATED, 'customerUi', this.onPlayerCreated.bind(this));
        PlayerStore.mb.subscribe(OO.EVENTS.VC_VIDEO_ELEMENT_CREATED, 'customerUi', this.onVcVideoElementCreated.bind(this));
        PlayerStore.mb.subscribe(OO.EVENTS.CONTENT_TREE_FETCHED, 'customerUi', this.onContentTreeFetched.bind(this));
        PlayerStore.mb.subscribe(OO.EVENTS.SKIN_METADATA_FETCHED, 'customerUi', this.onSkinMetaDataFetched.bind(this));
        PlayerStore.mb.subscribe(OO.EVENTS.INITIAL_PLAY, 'customerUi', this.onInitialPlay.bind(this));
        PlayerStore.mb.subscribe(OO.EVENTS.VC_PLAY, 'customerUi', this.onVcPlay.bind(this));
        PlayerStore.mb.subscribe(OO.EVENTS.VC_PLAYED, 'customerUi', this.onVcPlayed.bind(this));
        PlayerStore.mb.subscribe(OO.EVENTS.VC_PLAYING, 'customerUi', this.onPlaying.bind(this));
        PlayerStore.mb.subscribe(OO.EVENTS.VC_PAUSED, 'customerUi', this.onPaused.bind(this));
        PlayerStore.mb.subscribe(OO.EVENTS.VC_PAUSE, 'customerUi', this.onPause.bind(this));
        PlayerStore.mb.subscribe(OO.EVENTS.PLAYED, 'customerUi', this.onPlayed.bind(this));
      }
    },

    onPlayerCreated: function(event, elementId, params, settings) {
      console.log('BBB onPlayerCreated elementId', elementId, 'params', params, 'settings', settings);
      if (elementId) {
        this.createProvider(elementId);
      }
    },

    onVcVideoElementCreated: function(event, params) {
      console.log('BBB onVcVideoElementCreated params', params);
    },

    onSkinMetaDataFetched: function(event, skinMetaData) {
      console.log('BBB onSkinMetaDataFetched params', skinMetaData);
    },

    onContentTreeFetched: function(event, source) {
      if (source && source.promo_image) {
        PlayerStore.setPromoImage(source.promo_image);
      }
      console.log('BBB onContentTreeFetchec source', source);
    },

    onInitialPlay: function(event, source) {},
    onVcPlay: function(event, source) {},
    onPlaying: function(event, source) {},
    onVcPlayed: function(event, source) {},
    onPaused: function() {},
    onPause: function() {},
    onPlayed: function() {
      ScreenStore.setActiveScreen(CONSTANTS.screens.endScreen);
      PlayPauseStore.toggleVideoPlaying();
    },

    createProvider: function(elementId) {
      const Root = (
        <div className='oo-player-container'>
          <div className='innerWrapper oo-player oo-video-player'></div>
          <Provider ScreenStore={ScreenStore} PlayerStore={PlayerStore}>
            <Player />
          </Provider>
        </div>
      );
      ReactDOM.render(Root, document.getElementById(elementId));
    }
  };
  return Html5Skin;
});