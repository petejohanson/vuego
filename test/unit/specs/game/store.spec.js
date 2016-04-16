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
    describe('without an active game', () => {
      it('player turn does nothing', () => {
        let s = Object.assign({}, state);
        PLAYER_TURN(s, 1, 2);

        expect(s).toEqual(state);
      });
    });

    describe('with an active game', () => {
      let s = Object.assign({}, state);
      beforeEach(() => NEW_GAME(s, 19));

      describe('player turn', () => {
        it('should update the board', () => {
          PLAYER_TURN(s, 1, 2);

          expect(s.board[2][1]).toBe(BLACK);
          expect(s.current_turn).toBe(WHITE);
        });
      });

      describe('attempting to play an occupied location', () => {
        let s = Object.assign({}, state);
        beforeEach(() => {
          NEW_GAME(s, 19)
          PLAYER_TURN(s, 1, 1);
        });

        it('should not update the board', () => {
          PLAYER_TURN(s, 1, 1);

          expect(s.board[1][1]).toBe(BLACK);
          expect(s.current_turn).toBe(WHITE);
        });
      });
    });
  });
});
