
import { WHITE } from 'src/game/color';
import { addRemoteMove } from 'src/game/actions';

describe('Game store actions', () => {
  describe('adding a remote play', () => {
    var dispatch;

    beforeEach(() => {
      dispatch = jasmine.createSpy('store dispatcher');

      addRemoteMove({ dispatch }, { id: '123', move: { type: 'play', params: { x: 0, y: 0, color: WHITE } } });
    });

    it('sends the player turn',
      () => expect(dispatch).toHaveBeenCalledWith('PLAYER_TURN', 0, 0));

    it('Sets the last remote move id',
      () => expect(dispatch).toHaveBeenCalledWith('REMOTE_MOVE', { id: '123' }));
  });

  describe('adding a remote pass', () => {
    var dispatch;

    beforeEach(() => {
      dispatch = jasmine.createSpy('store dispatcher');

      addRemoteMove({ dispatch }, { id: '123', move: { type: 'pass', params: { color: WHITE } } });
    });

    it('sends the player turn',
      () => expect(dispatch).toHaveBeenCalledWith('PASS_TURN'));

    it('Sets the last remote move id',
      () => expect(dispatch).toHaveBeenCalledWith('REMOTE_MOVE', { id: '123' }));
  });
});
