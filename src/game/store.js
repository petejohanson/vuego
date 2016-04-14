import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { matrix } from '../arrays';
import { BLACK, oppositeColor } from './color';

export const state = {
  board: [],
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
    if (!state.current_turn || state.board[x][y]) {
      return;
    }

    state.board[x].$set(y, state.current_turn);
    state.current_turn = oppositeColor(state.current_turn);
  }
};

export default new Vuex.Store({
  state,
  mutations
})
