
import { BLACK, WHITE } from 'src/game/color';

export default [
  {
    test: 'Empty board',
    before: '?+++++\n' +
            '++++++\n' +
            '++++++\n' +
            '++++++\n' +
            '++++++\n' +
            '++++++\n',
    after: 'B+++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    turn: BLACK
  },
  {
    test: 'Single enemy to kill',
    before: 'B?++++\n' +
            'W+++++\n' +
            '++++++\n' +
            '++++++\n' +
            '++++++\n' +
            '++++++\n',
    after: '+W++++\n' +
           'W+++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    turn: WHITE
  },
  {
    test: 'Enemy group to kill',
    before: 'BBBW++\n' +
            'WW?+++\n' +
            '++++++\n' +
            '++++++\n' +
            '++++++\n' +
            '++++++\n',
    after: '+++W++\n' +
           'WWW+++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    turn: WHITE
  },
  {
    test: 'Avoiding suicide by capturing enemy',
    before: 'BBBW++\n' +
            'WW?B++\n' +
            'BBB+++\n' +
            '++++++\n' +
            '++++++\n' +
            '++++++\n',
    after: '+++W++\n' +
           'WWWB++\n' +
           'BBB+++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    turn: WHITE
  }
];
