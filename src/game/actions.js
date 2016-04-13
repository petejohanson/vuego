
let newGame = ({dispatch}, size) => dispatch('NEW_GAME', size)
let playerTurn = ({dispatch}, x, y) => dispatch('PLAYER_TURN', x, y)

export { newGame, playerTurn }
