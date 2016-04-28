import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { matrix } from '../arrays';
import { BLACK, WHITE, oppositeColor } from './color';
import { play, validatePlay } from './engine';

export const state = {
  game_done: false,
  board: matrix(19, 19),
  current_turn: null,
  pass_last_turn: false,
  size: 19,
  captures: {
    [BLACK]: 0,
    [WHITE]: 0
  },
  ko: null
};

export const mutations = {
  NEW_GAME (state, size) {
    state.game_done = false;
    state.size = size;
    state.board = matrix(size, size);
    state.current_turn = BLACK;
    state.captures[BLACK] = 0;
    state.captures[WHITE] = 0;
    state.ko = null;
    state.pass_last_turn = false;
  },

  PLAYER_TURN (state, x, y) {
    if (!state.current_turn || !validatePlay(state, x, y)) {
      return;
    }

    let { changes: turn, ko } = play(state, x, y);

    for (let i = 0; i < turn.length; ++i) {
      let t = turn[i];
      state.board[t.y].$set(t.x, t.color);

      if (!t.color) {
        state.captures[state.current_turn]++;
      }
    }

    state.ko = ko;
    state.pass_last_turn = false;
    state.current_turn = oppositeColor(state.current_turn);
  },

  PASS_TURN (state) {
    state.ko = null;

    if (state.pass_last_turn) {
      state.current_turn = null;
      state.game_done = true;
    } else {
      state.current_turn = oppositeColor(state.current_turn);
      state.pass_last_turn = true;
    }
  }
};

export default new Vuex.Store({
  state,
  mutations
})
