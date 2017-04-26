
import { WHITE } from '@/game/color';
import { actions } from '@/game/store';

const { addRemoteMove } = actions;

describe('Game store actions', () => {
  describe('adding a remote play', () => {
    var dispatch, commit;

    beforeEach(() => {
      dispatch = jasmine.createSpy('store dispatch');
      commit = jasmine.createSpy('store commit');

      addRemoteMove({ dispatch, commit }, { id: '123', move: { type: 'play', params: { x: 0, y: 0, color: WHITE } } });
    });

    it('sends the player turn',
      () => expect(dispatch).toHaveBeenCalledWith('playerTurn', { x: 0, y: 0 }));

    it('Sets the last remote move id',
      () => expect(commit).toHaveBeenCalledWith('remote_move', { id: '123' }));
  });

  describe('adding a remote pass', () => {
    var dispatch, commit;

    beforeEach(() => {
      dispatch = jasmine.createSpy('store dispatcher');
      commit = jasmine.createSpy('store commit');

      addRemoteMove({ commit, dispatch }, { id: '123', move: { type: 'pass', params: { color: WHITE } } });
    });

    it('sends the player turn',
      () => expect(dispatch).toHaveBeenCalledWith('pass'));

    it('Sets the last remote move id',
      () => expect(commit).toHaveBeenCalledWith('remote_move', { id: '123' }));
  });
});
