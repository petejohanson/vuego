
import { waitingForRemoteOpponent } from 'src/game/getters';
import { state, mutations } from 'src/game/store';

let { NEW_LOCAL_GAME, NEW_REMOTE_GAME, REMOTE_OPPONENT_ACCEPTED } = mutations;

describe('waitingForRemoteOpponent getter', () => {
  describe('for a local game', () => {
    it('returns false', () => {
      let s = Object.assign({}, state);

      NEW_LOCAL_GAME(s);

      expect(waitingForRemoteOpponent(s)).toBe(false);
    });
  });

  describe('for a new remote game', () => {
    it('returns true', () => {
      let s = Object.assign({}, state);

      NEW_REMOTE_GAME(s, { size: 9 });

      expect(waitingForRemoteOpponent(s)).toBe(true);
    });
  });

  describe('for a remote game after the opponent accepts', () => {
    it('returns false', () => {
      let s = Object.assign({}, state);

      NEW_REMOTE_GAME(s, { size: 9 });

      REMOTE_OPPONENT_ACCEPTED(s, { opponentId: '123' });

      expect(waitingForRemoteOpponent(s)).toBe(false);
    });
  })
});
