
import isUndefined from 'lodash/isUndefined';
import isEqual from 'lodash/isEqual';
import filter from 'lodash/fp/filter';
import flatMap from 'lodash/fp/flatMap';
import map from 'lodash/fp/map';
import partition from 'lodash/fp/partition';
import differenceWith from 'lodash/fp/differenceWith';
import every from 'lodash/fp/every';
import uniqWith from 'lodash/fp/uniqWith';
import some from 'lodash/fp/some';
import flow from 'lodash/fp/flow';
import { matrix } from '../arrays';
import { oppositeColor } from './color';

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
  return findGroupAndFreedoms(state, x, y).freedoms;
}

function findGroupAndFreedoms (state, x, y) {
  let points = matrix(state.size, state.size);

  let groupColor = state.board[y][x];

  if (!groupColor) {
    throw Error(`No piece at ${x},${y}`);
  }

  calculateFreedoms(state, groupColor, x, y, points);

  let freedoms = [];
  let group = [];
  for (let i = 0; i < points.length; ++i) {
    let row = points[i];
    for (let j = 0; j < row.length; ++j) {
      if (row[j] === true) {
        freedoms.push({ x: j, y: i });
      } else if (row[j] === groupColor) {
        group.push({ x: j, y: i });
      }
    }
  }

  return { freedoms, group };
}

function calculateFreedoms (state, color, x, y, calculated) {
  if (!isUndefined(calculated[y][x])) {
    return;
  }

  if (state.board[y][x] === color) {
    calculated[y][x] = color;
  } else {
    calculated[y][x] = isUndefined(state.board[y][x]);
  }

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

  if (isEqual(state.ko, { x, y })) {
    return false;
  }

  if (moveIsSuicide(state, x, y, state.current_turn)) {
    return false;
  }

  return true;
}

function play (state, x, y) {
  let changes = flow(
    filter(p => state.board[p.y][p.x] === oppositeColor(state.current_turn)),
    map(p => findGroupAndFreedoms(state, p.x, p.y)),
    filter(found => found.freedoms.length === 1),
    flatMap(found => found.group),
    uniqWith(isEqual)
  )(neighboringPoints(x, y, state.size));

  let ko = null;

  if (changes.length === 1) {
    let isKo = flow(
      differenceWith(changes, isEqual),
      every(p => state.board[p.y][p.x] === oppositeColor(state.current_turn))
    )(neighboringPoints(x, y, state.size));

    if (isKo) {
      ko = changes[0];
    }
  }

  changes.unshift({ x, y, color: state.current_turn });

  return { changes, ko };
}

export { neighboringPoints, freedoms, validatePlay, play }
