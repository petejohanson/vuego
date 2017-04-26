/**
 * Created by peter on 5/13/16.
 */

export default class LocalGame {
  constructor (store) {
    this.store = store;
  }

  pass () {
    this.store.dispatch('pass');
  }

  play (location) {
    this.store.dispatch('playerTurn', location);
  }

  localCurrentTurn () {
    return this.store.getters.currentTurn;
  }
}
