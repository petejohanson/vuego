import { BLACK } from 'src/game/color';

export default [
  {
    test: 'Empty board',
    board: '?+++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    check: { color: BLACK },
    expect: true
  },
  {
    test: 'Same color neighbor',
    board: 'B?++++\n' +
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
    test: 'Surrounded corner',
    board: '?W++++\n' +
           'W+++++\n' +
           '++++++\n' +
           '++++++\n' +
           '+++B++\n' +
           '++++++\n',
    check: { color: BLACK },
    expect: false
  }
];
