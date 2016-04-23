<template>
  <div id="app-container">
    <div id="app">
      <div>
        <captures></captures>
      </div>
      <board></board>
      <div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" @click="promptNewGame">
          New Game
        </button>
      </div>
    </div>
  </div>

  <new-game-dialog v-ref:new-game-dialog></new-game-dialog>
</template>

<script type="text/babel">
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Hello from './components/Hello';
import Board from './game/Board';
import Captures from './game/Captures';
import NewGameDialog from './game/NewGameDialog';

import store from './game/store';

import { newGame } from './game/actions';

export default {
  store,
  components: {
    Hello,
    Board,
    Captures,
    NewGameDialog
  },
  vuex: {
    actions: {
      newGame
    }
  },
  methods: {
    promptNewGame: function () {
      this.$refs.newGameDialog.show();
    }
  },
  ready: function () {
    this.newGame(19);
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
}

.app-footer {
  color: rgb(158,158,158);
  background-color: rgb(66,66,66);
  padding: 8px 8px;
  margin: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: .90;
}

.app-footer ul {
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.app-footer ul li {
  display: list-item;
  list-style: none;
  margin: 0 10px;
  width: auto;
  height: auto;
  background-color: transparent;
}

.app-footer .social-btn {
  display: block;
  color: white;
  opacity: 1;
}

.social-btn {
  background-size: contain;
  background: transparent no-repeat center;
  margin: 0 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 0.46;
  border-radius: 2px;
}
.social-btn__twitter {
  background-image: url('assets/post_twitter_white_24dp.png');
}

.social-btn__github {
  background-image: url('assets/github_white_24.svg');
}

#app-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
  width: 100%;
  padding: 24px 0;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Helvetica, sans-serif;
  text-align: center;
}

</style>
