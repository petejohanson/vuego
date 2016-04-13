import { state, mutations } from 'src/game/store';
import { BLACK, WHITE } from 'src/game/color';
const { PLAYER_TURN, NEW_GAME } = mutations;

describe('game store', () => {
  describe('starting a new game', () => {
    var s;

    beforeAll(() => {
      s = Object.assign({}, state);

      NEW_GAME(s, 19);
    });

    it('has the specified size',
       () => expect(s.size).toBe(19));

    it('has the correct number of rows',
       () => expect(s.board.length).toBe(19));
    it('has the correct first turn',
       () => expect(s.current_turn).toBe(BLACK));
  });

  describe('game play', () => {
    let s = Object.assign({}, state);
    beforeEach(() => NEW_GAME(s, 19));

    describe('player turn', () => {
      it('should update the board', () => {
        PLAYER_TURN(s, 1, 2);

        expect(s.board[1][2]).toBe(BLACK);
        expect(s.current_turn).toBe(WHITE);
      });
    });
  });
});
