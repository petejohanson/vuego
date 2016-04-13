<template>
  <div id="app">
    <board></board>
  </div>
</template>

<script type="text/babel">
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Hello from './components/Hello';
import Board from './game/Board';

import store from './game/store';

store.dispatch('NEW_GAME', 19);
store.dispatch('PLAYER_TURN', 0, 0);
store.dispatch('PLAYER_TURN', 1, 2);
store.dispatch('PLAYER_TURN', 0, 2);
store.dispatch('PLAYER_TURN', 4, 2);
store.dispatch('PLAYER_TURN', 7, 9);
store.dispatch('PLAYER_TURN', 17, 4);
store.dispatch('PLAYER_TURN', 18, 18);
store.dispatch('PLAYER_TURN', 17, 18);
store.dispatch('PLAYER_TURN', 18, 17);

export default {
  store,
  components: {
    Hello,
    Board
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
  margin-top: -100px;
  max-width: 600px;
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
