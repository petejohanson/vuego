
import isUndefined from 'lodash/isUndefined';
import isEqual from 'lodash/isEqual';
import flatMap from 'lodash/fp/flatMap';
import partition from 'lodash/fp/partition';
import uniqWith from 'lodash/fp/uniqWith';
import some from 'lodash/fp/some';
import flow from 'lodash/fp/flow';
import { matrix } from '../arrays';

function neighboringPoints (x, y, size) {
  let ret = [];

  if (x > 0) {
    ret.push({x: x - 1, y});
  }

  if (x + 1 < size) {
    ret.push({x: x + 1, y});
  }

  if (y > 0) {
    ret.push({y: y - 1, x});
  }

  if (y + 1 < size) {
    ret.push({y: y + 1, x});
  }

  return ret;
}

function moveIsSuicide (state, x, y, color) {
  let neighbors = neighboringPoints(x, y, state.size);
  let [occupied, free] = partition(p => state.board[p.y][p.x])(neighbors);

  if (free.length > 0) {
    return false;
  }

  let [friends, enemies] = partition(p => state.board[p.y][p.x] === color)(occupied);

  free = flow(
    flatMap(p => {
      return freedoms(state, p.x, p.y);
    }),
    uniqWith(isEqual)
  )(friends);

  if (free.length > 1) {
    return false;
  }

  return !some(p => freedoms(state, p.x, p.y).length === 1)(enemies);
}

function freedoms (state, x, y) {
  let points = matrix(state.size, state.size);

  let groupColor = state.board[y][x];

  if (!groupColor) {
    return [];
  }

  calculateFreedoms(state, groupColor, x, y, points);

  let ret = [];
  for (let i = 0; i < points.length; ++i) {
    let row = points[i];
    for (let j = 0; j < row.length; ++j) {
      if (row[j] === true) {
        ret.push({ x: j, y: i });
      }
    }
  }

  return ret;
}

function calculateFreedoms (state, color, x, y, calculated) {
  if (!isUndefined(calculated[y][x])) {
    return;
  }

  calculated[y][x] = isUndefined(state.board[y][x]);

  let candidates = neighboringPoints(x, y, state.size);

  for (let i = 0; i < candidates.length; ++i) {
    let c = candidates[i];
    if (isUndefined(state.board[c.y][c.x])) {
      calculated[c.y][c.x] = true;
    } else if (state.board[c.y][c.x] === color) {
      calculateFreedoms(state, color, c.x, c.y, calculated);
    }
  }
}

function validatePlay (state, x, y) {
  if (state.board[y][x]) {
    return false;
  }

  if (moveIsSuicide(state, x, y, state.current_turn)) {
    return false;
  }

  return true;
};

function play (state, x, y) {
  return [
    { x, y, color: state.current_turn }
  ];
};

export { neighboringPoints, freedoms, validatePlay, play }
