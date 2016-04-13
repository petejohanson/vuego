import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { matrix } from '../arrays';
import { BLACK } from './color';

export const state = {
  board: [],
  current_turn: null,
  size: null
};

export const mutations = {
  NEW_GAME (state, size) {
    state.size = size;
    state.board = matrix(size, size);
    state.current_turn = BLACK;
  },

  PLAYER_TURN (state, x, y) {
    if (state.board[x][y]) {
      return;
    }
    state.board[x].$set(y, state.current_turn);
    state.current_turn = state.current_turn.next;
  }
};

export default new Vuex.Store({
  state,
  mutations
})
