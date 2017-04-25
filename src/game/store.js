import Vue from 'vue';
import Vuex from 'vuex';

import promiseTry from 'es6-promise-try';

import countBy from 'lodash/fp/countBy';
import flattenDeep from 'lodash/fp/flattenDeep';
import filter from 'lodash/fp/filter';
import defaults from 'lodash/fp/defaults';
import flow from 'lodash/fp/flow';

import { matrix } from '../arrays';
import { BLACK, WHITE, oppositeColor } from './color';
import { play, validatePlay, neighboringPoints } from './engine';

import RemoteGame from './remote_game';

Vue.use(Vuex);

function inspectTerritory (state, x, y, t, territories) {
  if (territories[y][x]) {
    return;
  }

  let { board, size } = state;
  let color = board[y][x];
  if (color) {
    territories[y][x] = color;
    return;
  }

  territories[y][x] = t;

  let neighbors = neighboringPoints(x, y, size);

  for (let i = 0; i < neighbors.length; ++i) {
    let { x: nx, y: ny } = neighbors[i];

    if (board[ny][nx]) {
      t.neighbor(board[ny][nx]);
    }
    inspectTerritory(state, nx, ny, t, territories);
  }
}

class Territory {
  constructor (color) {
    this.neighbors = [];
    if (color) {
      this.neighbor(color);
    }
  }

  neighbor (color) {
    if (this.neighbors[0] !== color) {
      this.neighbors.push(color);
    }
  }

  owner () {
    if (this.neighbors.length === 1) {
      return this.neighbors[0];
    } else {
      return null;
    }
  }
}

function territoryCounts (state) {
  let { size } = state;
  let territories = matrix(size, size);
  for (let row = 0; row < size; ++row) {
    for (let col = 0; col < size; ++col) {
      if (territories[row][col]) {
        continue;
      }

      inspectTerritory(state, col, row, new Territory(), territories);
    }
  }

  return flow(
    flattenDeep,
    filter(t => t instanceof Territory),
    countBy(t => t.owner()),
    defaults({ [BLACK]: 0, [WHITE]: 0 })
  )(territories);
}

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

export const actions = {
  newGame ({ commit }, { size, remoteGame }) {
    if (remoteGame) {
      return promiseTry(() =>
        RemoteGame.create({size})
      ).then(g =>
        commit('new_remote_game', g)
      );
    } else {
      return Promise.resolve(commit('new_local_game', size));
    }
  },

  pass: ({ commit }) => commit('pass_turn'),
  playerTurn: ({ commit }, x, y) => commit('player_turn', x, y),

  joinGame ({ commit }, { gameId }) {
    return promiseTry(() =>
      RemoteGame.join({ gameId })
    ).then(g =>
      commit('join_remote_game', g)
    );
  },

  remoteOpponentAccepted ({ commit }, { opponentId }) {
    commit('remote_opponent_accepted', { opponentId });
  },

  cancelRemoteGame ({ commit }) {
    commit('cancel_remote_game');
  },

  addRemoteMove ({ dispatch, commit }, { id, move }) {
    let { type, params } = move;
    switch (type) {
      case 'play':
        let { x, y } = params;
        dispatch('playerTurn', { x, y });
        break;
      case 'pass':
        dispatch('pass');
        break;
    }

    commit('remote_move', { id });
  }
};

export const mutations = {
  new_local_game (state, size) {
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

  new_remote_game (state, { size, gameId, inviteId, [BLACK]: blackId, [WHITE]: whiteId }) {
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

  cancel_remote_game (s) {
    s.gameType = 'placeholder';
    s.remoteGameId = null;
    s.remoteInviteId = null;
    s.current_turn = null;
    s.size = state.size;
    s.board = matrix(s.size, s.size);
    Vue.set(s, BLACK, null);
    Vue.set(s, WHITE, null);
  },

  join_remote_game (state, { size, gameId, [BLACK]: blackId, [WHITE]: whiteId }) {
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

  remote_opponent_accepted (state, { opponentId }) {
    Vue.set(state, WHITE, opponentId);
  },

  remote_move (state, moveId) {
    state.lastRemoteMove = moveId;
  },

  player_turn (state, { x, y }) {
    if (!state.current_turn || !validatePlay(state, x, y)) {
      return;
    }

    let { changes: turn, ko } = play(state, x, y);

    for (let i = 0; i < turn.length; ++i) {
      let t = turn[i];
      Vue.set(state.board[t.y], t.x, t.color);

      if (!t.color) {
        state.captures[state.current_turn]++;
      }
    }

    state.ko = ko;
    state.pass_last_turn = false;
    state.current_turn = oppositeColor(state.current_turn);
  },

  pass_turn (state) {
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

export const getters = {
  ko: state => state.ko,
  size: state => state.size,
  gameType: state => state.gameType,
  gameDone: state => state.game_done,
  board: state => state.board,
  waitingForRemoteOpponent: state => state.gameType === 'remote' && !state[WHITE],
  inviteId: state => state.remoteInviteId,
  captures: state => state.captures,
  currentTurn: state => state.current_turn,

  score (state) {
    let { captures: { [BLACK]: blackCaptures, [WHITE]: whiteCaptures } } = state;
    let { [BLACK]: blackTerritory, [WHITE]: whiteTerritory } = territoryCounts(state);

    return {
      [BLACK]: blackTerritory + blackCaptures,
      [WHITE]: whiteTerritory + whiteCaptures
    };
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
