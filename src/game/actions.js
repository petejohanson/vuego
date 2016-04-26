
let newGame = ({dispatch}, size) => dispatch('NEW_GAME', size);
let playerTurn = ({dispatch}, x, y) => dispatch('PLAYER_TURN', x, y);
let pass = ({dispatch}) => dispatch('PASS_TURN');

export { newGame, playerTurn, pass }
