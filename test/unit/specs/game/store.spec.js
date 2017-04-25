import { state, mutations } from '@/game/store';
import { BLACK, WHITE } from '@/game/color';
const {
  player_turn,
  pass_turn,
  new_local_game,
  new_remote_game,
  join_remote_game,
  cancel_remote_game,
  remote_move,
  remote_opponent_accepted
} = mutations;

describe('game store', () => {
  describe('starting a new game', () => {
    var s;

    beforeAll(() => {
      s = Object.assign({}, state);

      new_local_game(s, 13);
      player_turn(s, { x: 0, y: 0 });
      player_turn(s, { x: 0, y: 1 });
      player_turn(s, { x: 10, y: 10 });
      player_turn(s, { x: 1, y: 0 });

      new_local_game(s, 19);
    });

    it('has the specified size',
       () => expect(s.size).toBe(19));

    it('has a game type of "local"',
       () => expect(s.gameType).toBe('local'));

    it('has 0 captures for both colors', () => {
      expect(s.captures[BLACK]).toBe(0);
      expect(s.captures[WHITE]).toBe(0);
    });

    it('has no previous passes',
      () => expect(s.pass_last_turn).toBe(false));

    it('is not done',
      () => expect(s.game_done).toBe(false));

    it('has the correct number of rows',
       () => expect(s.board.length).toBe(19));
    it('has the correct first turn',
       () => expect(s.current_turn).toBe(BLACK));
  });

  describe('game play', () => {
    describe('without an active game', () => {
      it('player turn does nothing', () => {
        let s = Object.assign({}, state);
        player_turn(s, { x: 1, y: 2 });

        expect(s).toEqual(state);
      });
    });

    describe('with an active game', () => {
      let s = Object.assign({}, state);
      beforeEach(() => new_local_game(s, 19));

      describe('player turn', () => {
        it('should update the board', () => {
          player_turn(s, { x: 1, y: 2 });

          expect(s.board[2][1]).toBe(BLACK);
          expect(s.current_turn).toBe(WHITE);
          expect(s.pass_last_turn).toBe(false);
        });
      });

      describe('passing a turn', () => {
        it('should leave the board as is, and change the current turn', () => {
          pass_turn(s);

          // TODO: Validate no changes to board.
          expect(s.current_turn).toBe(WHITE);
          expect(s.pass_last_turn).toBe(true);
        });
      });

      describe('two consecutive passes', () => {
        it('should mark the game as done', () => {
          pass_turn(s);
          pass_turn(s);

          expect(s.current_turn).toBeNull();
          expect(s.game_done).toBe(true);
        })
      });

      describe('player turn to capture a piece', () => {
        beforeEach(() => {
          player_turn(s, { x: 0, y: 0 });
          player_turn(s, { x: 0, y: 1 });
          player_turn(s, { x: 10, y: 10 });
        });

        it('should update the captures appropriately', () => {
          let turn = s.current_turn;
          player_turn(s, { x: 1, y: 0 });

          expect(s.captures[turn]).toBe(1);
        });
      });

      describe('attempting to play an occupied location', () => {
        let s = Object.assign({}, state);
        beforeEach(() => {
          new_local_game(s, 19);
          player_turn(s, { x: 1, y: 1 });
        });

        it('should not update the board', () => {
          player_turn(s, { x: 1, y: 1 });

          expect(s.board[1][1]).toBe(BLACK);
          expect(s.current_turn).toBe(WHITE);
        });
      });
    });
  });

  describe('starting a new remote game', () => {
    var s;

    beforeAll(() => {
      s = Object.assign({}, state);

      new_local_game(s, 13);
      player_turn(s, { x: 0, y: 0 });
      player_turn(s, { x: 10, y: 10 });
      player_turn(s, { x: 1, y: 0 });

      new_remote_game(s, { size: 19, gameId: '1234', inviteId: '321', [BLACK]: '0123' });
    });

    it('has the specified size',
      () => expect(s.size).toBe(19));

    it('has a game type of "remote"',
      () => expect(s.gameType).toBe('remote'));

    it('has 0 captures for both colors', () => {
      expect(s.captures[BLACK]).toBe(0);
      expect(s.captures[WHITE]).toBe(0);
    });

    it('has no previous passes',
      () => expect(s.pass_last_turn).toBe(false));

    it('is not done',
      () => expect(s.game_done).toBe(false));

    it('has the correct number of rows',
      () => expect(s.board.length).toBe(19));

    it('has the correct first turn',
      () => expect(s.current_turn).toBe(BLACK));

    it('has the remote game id',
      () => expect(s.remoteGameId).toBe('1234'));

    it('has the remote invite id',
      () => expect(s.remoteInviteId).toBe('321'));

    it('has the correct black player ID',
      () => expect(s[BLACK]).toBe('0123'));
  });

  describe('canceling a remote game', () => {
    var s;
    beforeAll(() => {
      s = Object.assign({}, state);

      new_remote_game(s, { size: 19, gameId: '1234', inviteId: '321', [BLACK]: '0123' });

      cancel_remote_game(s);
    });

    it('should have a placeholder game',
      () => expect(s.gameType).toEqual('placeholder'));

    it('should not have a remote game id',
      () => expect(s.remoteGameId).toBeNull());

    it('should have no invite ID',
      () => expect(s.remoteInviteId).toBeNull());

    it('should have no black player ID',
      () => expect(s[BLACK]).toBeNull());

    it('should have no white player ID',
      () => expect(s[WHITE]).toBeNull());

    it('should have no current turn',
      () => expect(s.current_turn).toBeNull());

    it('should have the default size',
      () => expect(s.size).toBe(state.size));
  });

  describe('joining a remote game', () => {
    var s;

    beforeAll(() => {
      s = Object.assign({}, state);

      new_local_game(s, 13);
      player_turn(s, { x: 0, y: 0 });
      player_turn(s, { x: 10, y: 10 });
      player_turn(s, { x: 1, y: 0 });

      join_remote_game(s, { size: 19, gameId: '1234', [BLACK]: '0123', [WHITE]: '3210' });
    });

    it('has the specified size',
      () => expect(s.size).toBe(19));

    it('has a game type of "remote"',
      () => expect(s.gameType).toBe('remote'));

    it('has 0 captures for both colors', () => {
      expect(s.captures[BLACK]).toBe(0);
      expect(s.captures[WHITE]).toBe(0);
    });

    it('has no previous passes',
      () => expect(s.pass_last_turn).toBe(false));

    it('is not done',
      () => expect(s.game_done).toBe(false));

    it('has the correct number of rows',
      () => expect(s.board.length).toBe(19));

    it('has the correct first turn',
      () => expect(s.current_turn).toBe(BLACK));

    it('has the remote game id',
      () => expect(s.remoteGameId).toBe('1234'));

    it('has the correct black player ID',
      () => expect(s[BLACK]).toBe('0123'));

    it('has the correct white player ID',
      () => expect(s[WHITE]).toBe('3210'));
  });

  describe('an opponent accepting your remote game invitation', () => {
    var s;

    beforeAll(() => {
      s = Object.assign({}, state);

      new_remote_game(s, { size: 19, gameId: '1234', [BLACK]: '0123' });

      remote_opponent_accepted(s, { opponentId: '4321' });
    });

    it('updates the white player ID',
      () => expect(s[WHITE]).toBe('4321'));
  });

  describe('playing a remote move', () => {
    let s = null;

    beforeEach(() => {
      s = Object.assign({}, state);

      new_remote_game(s, { size: 9, gameId: '123', inviteId: '321' });

      player_turn(s, { x: 0, y: 0 });
      remote_move(s, '123');
    });

    it('stores the last remote move id',
      () => expect(s.lastRemoteMove).toBe('123'));
  });
});
