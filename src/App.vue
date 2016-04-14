<template>
  <div id="app">
    <board></board>
    <div>
      <a href="#" @click.prevent="newGame(19)">New Game</a>
    </div>

    <div class="footer">
      <ul>
        <li>GitHub: <a href="https://github.com/petejohanson/vuego">petejohanson/vuego</a></li>
        <li>Twitter: <a href="https://twitter.com/petejohanson">@petejohanson</a></li>
      <ul>
    </div>
  </div>
</template>

<script type="text/babel">
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Hello from './components/Hello';
import Board from './game/Board';

import store from './game/store';

import { newGame } from './game/actions';

store.dispatch('NEW_GAME', 19);
store.dispatch('PLAYER_TURN', 0, 0);
store.dispatch('PLAYER_TURN', 1, 2);
store.dispatch('PLAYER_TURN', 4, 2);
store.dispatch('PLAYER_TURN', 17, 18);
store.dispatch('PLAYER_TURN', 18, 17);

export default {
  store,
  components: {
    Hello,
    Board
  },
  vuex: {
    actions: {
      newGame
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  max-width: 600px;
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.footer ul {
  list-style-type: none;
  margin: 10px 0;
  padding: 0;
}

</style>
