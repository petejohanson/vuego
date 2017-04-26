
import { state, mutations, getters } from '@/game/store';

const { waitingForRemoteOpponent } = getters;
const { new_local_game, new_remote_game, remote_opponent_accepted } = mutations;

describe('waitingForRemoteOpponent getter', () => {
  describe('for a local game', () => {
    it('returns false', () => {
      let s = Object.assign({}, state);

      new_local_game(s);

      expect(waitingForRemoteOpponent(s)).toBe(false);
    });
  });

  describe('for a new remote game', () => {
    it('returns true', () => {
      let s = Object.assign({}, state);

      new_remote_game(s, { size: 9 });

      expect(waitingForRemoteOpponent(s)).toBe(true);
    });
  });

  describe('for a remote game after the opponent accepts', () => {
    it('returns false', () => {
      let s = Object.assign({}, state);

      new_remote_game(s, { size: 9 });

      remote_opponent_accepted(s, { opponentId: '123' });

      expect(waitingForRemoteOpponent(s)).toBe(false);
    });
  })
});
