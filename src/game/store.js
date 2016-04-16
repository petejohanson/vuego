import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { matrix } from '../arrays';
import { BLACK, oppositeColor } from './color';
import { play, validatePlay } from './engine';

export const state = {
  board: matrix(19, 19),
  current_turn: null,
  size: 19
};

export const mutations = {
  NEW_GAME (state, size) {
    state.size = size;
    state.board = matrix(size, size);
    state.current_turn = BLACK;
  },

  PLAYER_TURN (state, x, y) {
    if (!state.current_turn || !validatePlay(state, x, y)) {
      return;
    }

    let turn = play(state, x, y);

    for (let i = 0; i < turn.length; ++i) {
      let t = turn[i];
      state.board[t.x].$set(t.y, t.color);
    }

    state.current_turn = oppositeColor(state.current_turn);
  }
};

export default new Vuex.Store({
  state,
  mutations
})
