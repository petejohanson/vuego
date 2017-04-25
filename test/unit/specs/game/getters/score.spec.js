
import { getters } from '@/game/store';
import { BLACK, WHITE } from '@/game/color';
import { parseBoard } from '../helpers';
import SCORE_TESTS from './score.data';

const { score } = getters;

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
