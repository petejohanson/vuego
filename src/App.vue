<template>
  <div id="app-container">
    <div id="app">
      <div>
        <captures></captures>
      </div>
      <div v-if="!currentTurn" class="app-prompt-overlay">
        <div>
          <div class="app-prompt">
            <div v-if="gameDone">
              <h5>Game Complete!</h5>
              <ul class="app-game-scores">
                <li>Black: {{score[BLACK]}}</li>
                <li>White: {{score[WHITE]}}</li>
              </ul>
            </div>
            <div v-else>
              <h5>Welcome to VueGo</h5>
            </div>
            <mdl-button colored raised class="mdl-js-ripple-effect" @click="promptNewGame">
              New Game
            </mdl-button>
          </div>
        </div>
      </div>
      <board></board>
    </div>
  </div>

  <div class="app-actions">
    <div v-if="currentTurn">
      <mdl-button  id="pass" fab icon colored class="mdl-js-ripple-effect" @click="pass">
        <i class="material-icons">skip_next</i>
      </mdl-button>
      <mdl-tooltip for="pass">
        Pass Turn
      </mdl-tooltip>
    </div>
  </div>

  <new-game-dialog v-ref:new-game-dialog></new-game-dialog>
</template>

<script type="text/babel">
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { MdlButton, MdlTooltip } from 'vue-mdl';

import Hello from './components/Hello';
import Board from './game/Board';
import Captures from './game/Captures';
import NewGameDialog from './game/NewGameDialog';

import { BLACK, WHITE } from './game/color';
import store from './game/store';

import { newGame, pass } from './game/actions';
import { currentTurn, gameDone, score } from './game/getters';

export default {
  store,
  components: {
    Hello,
    Board,
    Captures,
    NewGameDialog,
    MdlTooltip,
    MdlButton
  },
  vuex: {
    actions: {
      newGame,
      pass
    },
    getters: {
      currentTurn,
      gameDone,
      score
    }
  },
  data: function () {
    return {
      WHITE,
      BLACK
    };
  },
  methods: {
    promptNewGame: function () {
      this.$refs.newGameDialog.show();
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  position: relative;
}


.app-actions {
  position: fixed;
  z-index: 120;
  right: 0;
  bottom: 0;
  margin: 30px;

}

.app-prompt-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.app-prompt-overlay > * {
  height: 100%;
  width: 70vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.app-prompt {
  @extend .mdl-shadow--2dp;
  border-radius: 2px;
  background-color: #fff;
  padding: 6px;
}

.app-game-scores {
  display: inline-block;
  list-style-type: none;
  font-weight: bold;
  font-size: larger;
  margin: 8px 0;
  padding: 0;
}

.app-game-scores li {
  display: inline-block;
  margin: 0 8px;
  padding: 0;
}

.app-footer {
  color: rgb(158,158,158);
  background-color: rgb(66,66,66);
  padding: 4px 4px;
  margin: 0;
  position: absolute;
  opacity: .90;
}

@media (orientation: landscape) {
  .app-footer {
    top: 0;
    bottom: 0;
    right: 0;
  }

  .app-footer ul {
    flex-direction: column;
    min-height: 100%;
    margin: 0;
  }

  .app-footer ul li {
    margin: 10px 0;
  }
}
@media (orientation: portrait) {
  .app-footer {
    bottom: 0;
    left: 0;
    right: 0;
  }

  .app-footer ul {
    flex-direction: row;
  }

  .app-footer ul li {
    margin: 0 10px;
  }
}

.app-footer ul {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.app-footer ul li {
  display: list-item;
  list-style: none;
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
  position: relative;
}

</style>
