<template>
  <div id="app-container">
    <div id="app">
      <div>
        <captures></captures>
      </div>
      <div v-if="showNewGamePrompt" class="app-prompt-overlay">
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
            <mdl-button colored raised class="mdl-js-ripple-effect" @click="promptJoinGame">
              Join Game
            </mdl-button>
          </div>
        </div>
      </div>
      <board @play="play" :local-current-turn="localCurrentTurn" :ko="ko" :size="size" :board="board"></board>
    </div>
  </div>

  <div class="app-actions">
    <div v-if="localCurrentTurn">
      <mdl-button  id="pass" fab icon colored class="mdl-js-ripple-effect" @click="pass">
        <i class="material-icons">skip_next</i>
      </mdl-button>
      <mdl-tooltip for="pass">
        Pass Turn
      </mdl-tooltip>
    </div>
  </div>

  <new-game-dialog v-if="showNewGameDialog" @new-game="doNewGame" @cancel="hideNewGamePrompt"></new-game-dialog>
  <join-game-dialog v-if="showJoinGameDialog" @join-game="doJoinGame" @cancel="hideJoinGamePrompt"></join-game-dialog>
</template>

<script type="text/babel">
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import promiseTry from 'es6-promise-try';

import { MdlButton, MdlTooltip } from 'vue-mdl';

import Hello from './components/Hello';
import Board from './game/Board';
import Captures from './game/Captures';
import NewGameDialog from './game/NewGameDialog';
import JoinGameDialog from './game/JoinGameDialog';

import { BLACK, WHITE } from './game/color';
import store from './game/store';

import LocalGame from './game/local_game';
import RemoteGame from './game/remote_game';

import { newGame, joinGame } from './game/actions';
import { gameDone, score, ko, size, gameType, board } from './game/getters';

export default {
  store,
  components: {
    Hello,
    Board,
    Captures,
    NewGameDialog,
    JoinGameDialog,
    MdlTooltip,
    MdlButton
  },
  vuex: {
    actions: {
      newGame,
      joinGame
    },
    getters: {
      gameType,
      ko,
      gameDone,
      score,
      board,
      size
    }
  },
  computed: {
    game: function () {
      switch (this.gameType) {
        case 'local':
          return new LocalGame(this.$store);
        case 'remote':
          return new RemoteGame(this.$store);
        default:
          return null;
      }
    },
    localCurrentTurn: function () {
      return this.game ? this.game.localCurrentTurn() : null;
    },
    showNewGamePrompt: function () {
      return !this.game || this.gameDone;
    }
  },
  data: function () {
    return {
      WHITE,
      BLACK,
      showNewGameDialog: false,
      showJoinGameDialog: false
    };
  },
  methods: {
    pass: function () {
      this.game.pass();
    },
    play: function ({ x, y }) {
      this.game.play({ x, y }); // TODO: Color as well?
    },
    doNewGame: function (options) {
      // TODO: Make the dialog disabled
      promiseTry(() =>
        this.newGame(options)
      ).then(() => {
        this.hideNewGamePrompt();
        // Make the dialog enabled again for next use.
      });
    },
    doJoinGame: function (options) {
      promiseTry(() =>
        this.joinGame(options)
      ).then(() =>
        this.hideJoinGamePrompt()
      );
    },
    promptNewGame: function () {
      this.showNewGameDialog = true;
    },
    hideNewGamePrompt: function () {
      this.showNewGameDialog = false;
    },
    promptJoinGame: function () {
      this.showJoinGameDialog = true;
    },
    hideJoinGamePrompt: function () {
      this.showJoinGameDialog = false;
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
