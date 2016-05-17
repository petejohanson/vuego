
import { BLACK, WHITE } from 'src/game/color';

export default [
  {
    test: 'Basic game',
    board: '+++WB+\n' +
           '++WB++\n' +
           '++WB++\n' +
           '++WB++\n' +
           '++WWB+\n' +
           '+++WB+',
    expect: { [BLACK]: 9, [WHITE]: 14 }
  },
  {
    test: 'Basic game, with captures',
    board: '+++WB+\n' +
           '++WB++\n' +
           '++WB++\n' +
           '++WB++\n' +
           '++WWB+\n' +
           '+++WB+',
    captures: { [BLACK]: 2, [WHITE]: 3 },
    expect: { [BLACK]: 11, [WHITE]: 17 }
  },
  {
    test: 'Tied game, due to no owned territory',
    board: '+++WB+\n' +
           '++WB++\n' +
           '++++++\n' +
           '++WB++\n' +
           '++WWB+\n' +
           '+++WB+',
    expect: { [BLACK]: 0, [WHITE]: 0 }
  },
  {
    test: 'Basic game, with eyes',
    board: '+++WB+\n' +
           '++WB++\n' +
           '+WWBB+\n' +
           'W+WB+B\n' +
           '+WWWB+\n' +
           '+++WB+',
    expect: { [BLACK]: 7, [WHITE]: 11 }
  }
];
