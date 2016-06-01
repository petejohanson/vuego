
import RemoteGame from './remote_game';
import promiseTry from 'es6-promise-try';

export function newGame ({dispatch}, { size, remoteGame }) {
  if (remoteGame) {
    return promiseTry(() =>
      RemoteGame.create({size})
    ).then(g =>
      dispatch('NEW_REMOTE_GAME', g)
    );
  } else {
    return Promise.resolve(dispatch('NEW_LOCAL_GAME', size));
  }
}

export function joinGame ({ dispatch }, { gameId }) {
  return promiseTry(() =>
    RemoteGame.join({ gameId })
  ).then(g =>
    dispatch('JOIN_REMOTE_GAME', g)
  );
}

export function cancelRemoteGame ({ dispatch }) {
  dispatch('CANCEL_REMOTE_GAME');
}

export function addRemoteMove (store, { id, move }) {
  let { dispatch } = store;
  let { type, params } = move;
  switch (type) {
    case 'play':
      let { x, y } = params;
      playerTurn(store, x, y);
      break;
    case 'pass':
      pass(store);
      break;
  }

  dispatch('REMOTE_MOVE', { id });
}

export function playerTurn ({dispatch}, x, y) {
  dispatch('PLAYER_TURN', x, y);
}

export function pass ({dispatch}) {
  dispatch('PASS_TURN');
}
