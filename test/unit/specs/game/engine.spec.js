import _ from 'lodash';
import { neighboringPoints, freedoms } from 'src/game/engine';
import { matrix } from 'src/arrays';
import { BLACK, WHITE } from 'src/game/color';

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
    let parseBoard = s => {
      let lines = s.split('\n');
      let board = matrix(lines.length, lines.length);
      let expect = []
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
          }
        }
      }

      return { board, expect };
    }
    const FREEDOM_TESTS = [
      {
        test: 'Single unsurrounded stone',
        board: 'B?++++\n' +
               '?+++++\n' +
               '++++++\n' +
               '++++++\n' +
               '++++++\n' +
               '++++++\n',
        check: { x: 0, y: 0 }
      },
      {
        test: 'Simple group line',
        board: 'BB?+++\n' +
               '??++++\n' +
               '++++++\n' +
               '++++++\n' +
               '++++++\n' +
               '++++++\n',
        check: { x: 0, y: 0 }
      },
      {
        test: 'Basic group',
        board: 'BB?+++\n' +
               '?B?+++\n' +
               '+?++++\n' +
               '++++++\n' +
               '++++++\n' +
               '++++++\n',
        check: { x: 0, y: 0 }
      },
      {
        test: 'Circular group',
        board: '?BBB?+\n' +
               '?B?B?+\n' +
               '?BBB?+\n' +
               '+???++\n' +
               '++++++\n' +
               '++++++\n',
        check: { x: 1, y: 0 }
      },
      {
        test: 'Partially surrounded group',
        board: 'BBBB?+\n' +
               'BBBW++\n' +
               '?WW+++\n' +
               '++++++\n' +
               '++++++\n' +
               '++++++\n',
        check: { x: 0, y: 0 }
      },
      {
        test: 'Completely surrounded group',
        board: 'BBBBW+\n' +
               'BBBW++\n' +
               'WWW+++\n' +
               '++++++\n' +
               '++++++\n' +
               '++++++\n',
        check: { x: 0, y: 0 }
      }
    ];

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
});
