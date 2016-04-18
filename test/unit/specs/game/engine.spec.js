import _ from 'lodash';
import { neighboringPoints, freedoms, validatePlay } from 'src/game/engine';
import { matrix } from 'src/arrays';
import { BLACK, WHITE } from 'src/game/color';
import FREEDOM_TESTS from './freedomDetection.data';
import VALID_PLAY_TESTS from './validatePlay.data';

let parseBoard = s => {
  let valid = [];
  let invalid = [];
  let expect = [];

  let lines = s.split('\n');
  let board = matrix(lines.length, lines.length);

  for (let i = 0; i < lines.length; ++i) {
    let line = lines[i];
    for (let j = 0; j < line.length; ++j) {
      switch (line[j]) {
        case 'B':
          board[i][j] = BLACK;
          break;
        case 'W':
          board[i][j] = WHITE;
          break;
        case '?':
          expect.push({ x: j, y: i });
          break;
        case '✓':
          valid.push({ x: j, y: i });
          break;
        case '×':
          invalid.push({ x: j, y: i });
          break;
      }
    }
  }

  return { board, expect, valid, invalid };
}

describe('game engine', () => {
  describe('neighboringPoints', () => {
    it('works for points in 0,0 corner', () => {
      let n = neighboringPoints(0, 0, 10);
      expect(n).toContain({x: 0, y: 1});
      expect(n).toContain({x: 1, y: 0});
      expect(n.length).toBe(2);
    });

    it('works for points in 0,size corner', () => {
      let n = neighboringPoints(0, 9, 10);
      expect(n).toContain({x: 1, y: 9});
      expect(n).toContain({x: 0, y: 8});
      expect(n.length).toBe(2);
    });

    it('works for points in size,0 corner', () => {
      let n = neighboringPoints(9, 0, 10);
      expect(n).toContain({y: 1, x: 9});
      expect(n).toContain({y: 0, x: 8});
      expect(n.length).toBe(2);
    });

    it('works for points in size,size corner', () => {
      let n = neighboringPoints(9, 9, 10);
      expect(n).toContain({y: 8, x: 9});
      expect(n).toContain({y: 9, x: 8});
      expect(n.length).toBe(2);
    });

    it('works along an edge', () => {
      let n = neighboringPoints(0, 3, 10);
      expect(n.length).toBe(3);
      expect(n).toContain({x: 0, y: 2});
      expect(n).toContain({x: 0, y: 4});
      expect(n).toContain({x: 1, y: 3});
    });
  });

  describe('freedoms', () => {
    beforeEach(() => {
      jasmine.addCustomEqualityTester((a, b) => {
        if (_.isArray(a) && _.isArray(b)) {
          return a.length === b.length && _.intersectionWith(a, b, _.isEqual).length === a.length;
        }
      });
    });

    for (let i = 0; i < FREEDOM_TESTS.length; ++i) {
      let test = FREEDOM_TESTS[i];
      it(test.test, () => {
        let {x, y} = test.check;
        let { board, expect: e } = parseBoard(test.board);
        let res = freedoms({board, size: board.length}, x, y);

        expect(res).toEqual(e);
      });
    }
  });

  describe('validatePlay', () => {
    for (let i = 0; i < VALID_PLAY_TESTS.length; ++i) {
      let test = VALID_PLAY_TESTS[i];
      it(test.test, () => {
        let { color } = test.check;
        let { board, valid, invalid } = parseBoard(test.board);

        let expectedResult = test.expect;
        let check = test.check;
        if (valid.length > 0) {
          expectedResult = true;
          check = valid[0];
        } else if (invalid.length > 0) {
          expectedResult = false;
          check = invalid[0];
        }

        let { x, y } = check;

        let res = validatePlay({board, size: board.length, current_turn: color}, x, y);

        expect(res).toEqual(expectedResult);
      });
    }
  });
});
