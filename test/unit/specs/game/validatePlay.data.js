import { BLACK, WHITE } from '@/game/color';

export default [
  {
    test: 'Empty board',
    board: '✓+++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    check: { color: BLACK }
  },
  {
    test: 'Same color neighbor',
    board: 'B✓++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    check: { color: BLACK },
    expect: true
  },
  {
    test: 'Occupied point',
    board: 'W+++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    check: { x: 0, y: 0, color: BLACK },
    expect: false
  },
  {
    test: 'Ko point',
    board: '++++++\n' +
           '++++++\n' +
           '++WB++\n' +
           '+WBKB+\n' +
           '++WW++\n' +
           '++++++\n',
    check: { x: 3, y: 3, color: WHITE },
    expect: false
  },
  {
    test: 'Surrounded corner',
    board: '×W++++\n' +
           'W+++++\n' +
           '++++++\n' +
           '++++++\n' +
           '+++B++\n' +
           '++++++\n',
    check: { color: BLACK }
  },
  {
    test: 'Surrounded Middle',
    board: '+W++++\n' +
           'W+++++\n' +
           '++BBB+\n' +
           'W+B×B+\n' +
           '++BBB+\n' +
           '++++++\n',
    check: { color: WHITE }
  },
  {
    test: 'Surrounded middle of like color',
    board: '+W++++\n' +
           'W+++++\n' +
           '++BBB+\n' +
           'W+B✓B+\n' +
           '++BBB+\n' +
           '++++++\n',
    check: { color: BLACK }
  },
  {
    test: 'Surrounded middle with friendly alive neighbor',
    board: '+W++++\n' +
           'W+++++\n' +
           '++BBB+\n' +
           'W+B✓W+\n' +
           '++BBB+\n' +
           '++++++\n',
    check: { color: WHITE }
  },
  {
    test: 'Surrounded middle with friendly surrounded neighbor',
    board: '+W++++\n' +
           'W+++++\n' +
           '++BBB+\n' +
           'W+B×WB\n' +
           '++BBB+\n' +
           '++++++\n',
    check: { color: WHITE }
  },
  {
    test: 'Surrounded middle with multiple friendly surrounded neighbor',
    board: '+W+BB+\n' +
           'W+BWWB\n' +
           '++BWB+\n' +
           'W+B×WB\n' +
           '++BBB+\n' +
           '++++++\n',
    check: { color: WHITE }
  },
  {
    test: 'Surrounded corner with vulnerable enemy neighbor',
    board: '✓WB+++\n' +
           'WB++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    check: { color: BLACK }
  }
];
