<template>
  <div id="app">
    <div>
      <p>Captures</p>
      <captures></captures>
    </div>
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
import Captures from './game/Captures';

import store from './game/store';

import { newGame } from './game/actions';

export default {
  store,
  components: {
    Hello,
    Board,
    Captures
  },
  vuex: {
    actions: {
      newGame
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
