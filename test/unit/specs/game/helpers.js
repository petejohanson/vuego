import { BLACK, WHITE } from 'src/game/color';
import { matrix } from 'src/arrays';

export function parseBoard (s) {
  let valid = [];
  let invalid = [];
  let expect = [];
  let ko = null;

  let lines = s.split('\n');
  let board = matrix(lines.length, lines.length);

  for (let i = 0; i < lines.length; ++i) {
    let line = lines[i];
    for (let j = 0; j < line.length; ++j) {
      switch (line[j]) {
        case 'B':
          board[i][j] = BLACK;
          break;
        case 'W':
          board[i][j] = WHITE;
          break;
        case 'K':
          ko = { x: j, y: i };
          break;
        case '?':
          expect.push({ x: j, y: i });
          break;
        case '✓':
          valid.push({ x: j, y: i });
          break;
        case '×':
          invalid.push({ x: j, y: i });
          break;
      }
    }
  }

  return { board, check: expect, expect, valid, invalid, ko };
}
