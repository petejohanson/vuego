
import { score } from 'src/game/getters';
import { BLACK, WHITE } from 'src/game/color';
import { parseBoard } from '../helpers';
import SCORE_TESTS from './score.data';

describe('game score', () => {
  for (let i = 0; i < SCORE_TESTS.length; ++i) {
    let test = SCORE_TESTS[i];
    it(test.test, () => {
      let { captures = { [BLACK]: 0, [WHITE]: 0 }, expect: expectedScore } = test;
      let { board } = parseBoard(test.board);

      let testScore = score({board, size: board.length, captures});

      expect(testScore).toEqual(expectedScore);
    });
  }
});
