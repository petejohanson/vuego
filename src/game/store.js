import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { matrix } from '../arrays';
import { BLACK, WHITE, oppositeColor } from './color';
import { play, validatePlay } from './engine';

export const state = {
  game_done: false,
  board: matrix(9, 9),
  gameType: 'placeholder',
  current_turn: null,
  remoteInviteId: null,
  remoteGameId: null,
  pass_last_turn: false,
  size: 9,
  captures: {
    [BLACK]: 0,
    [WHITE]: 0
  },
  ko: null
};

export const mutations = {
  NEW_LOCAL_GAME (state, size) {
    state.gameType = 'local';
    state.game_done = false;
    state.size = size;
    state.board = matrix(size, size);
    state.current_turn = BLACK;
    state.captures[BLACK] = 0;
    state.captures[WHITE] = 0;
    state.ko = null;
    state.remoteGameId = null;
    state.pass_last_turn = false;
  },

  NEW_REMOTE_GAME (state, { size, gameId, inviteId, [BLACK]: blackId, [WHITE]: whiteId }) {
    state.gameType = 'remote';
    state.game_done = false;
    state.size = size;
    state.captures = { [BLACK]: 0, [WHITE]: 0 };
    state.board = matrix(size, size);
    state.remoteGameId = gameId;
    state.remoteInviteId = inviteId;
    state.current_turn = BLACK;
    Vue.set(state, BLACK, blackId);
    Vue.set(state, WHITE, whiteId);
  },

  CANCEL_REMOTE_GAME (s) {
    s.gameType = 'placeholder';
    s.remoteGameId = null;
    s.remoteInviteId = null;
    s.current_turn = null;
    s.size = state.size;
    s.board = matrix(s.size, s.size);
    Vue.set(s, BLACK, null);
    Vue.set(s, WHITE, null);
  },

  JOIN_REMOTE_GAME (state, { size, gameId, [BLACK]: blackId, [WHITE]: whiteId }) {
    state.gameType = 'remote';
    state.game_done = false;
    state.size = size;
    state.captures = { [BLACK]: 0, [WHITE]: 0 };
    state.board = matrix(size, size);
    state.remoteGameId = gameId;
    state.current_turn = BLACK;
    Vue.set(state, BLACK, blackId);
    Vue.set(state, WHITE, whiteId);
  },

  REMOTE_OPPONENT_ACCEPTED (state, { opponentId }) {
    Vue.set(state, WHITE, opponentId);
  },

  REMOTE_MOVE (state, moveId) {
    state.lastRemoteMove = moveId;
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
