import { BLACK, WHITE } from './color';
import { matrix } from '../arrays';

import { neighboringPoints } from './engine';

import countBy from 'lodash/fp/countBy';
import flattenDeep from 'lodash/fp/flattenDeep';
import filter from 'lodash/fp/filter';
import defaults from 'lodash/fp/defaults';
import flow from 'lodash/fp/flow';

export function ko (state) {
  return state.ko;
}

export function size (state) {
  return state.size;
}

export function gameType (state) {
  return state.gameType;
}

export function currentTurn (state) {
  return state.current_turn;
}

export function board (state) {
  return state.board;
}

export function gameDone (state) {
  return state.game_done;
}

export function waitingForRemoteOpponent (state) {
  return state.gameType === 'remote' && !state[WHITE];
}

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

export function score (state) {
  let { captures: { [BLACK]: blackCaptures, [WHITE]: whiteCaptures } } = state;
  let { [BLACK]: blackTerritory, [WHITE]: whiteTerritory } = territoryCounts(state);

  return {
    [BLACK]: blackTerritory + blackCaptures,
    [WHITE]: whiteTerritory + whiteCaptures
  };
}
