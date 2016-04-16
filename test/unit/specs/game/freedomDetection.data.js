export default [
  {
    test: 'Single unsurrounded stone',
    board: 'B?++++\n' +
           '?+++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    check: { x: 0, y: 0 }
  },
  {
    test: 'Simple group line',
    board: 'BB?+++\n' +
           '??++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    check: { x: 0, y: 0 }
  },
  {
    test: 'Basic group',
    board: 'BB?+++\n' +
           '?B?+++\n' +
           '+?++++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    check: { x: 0, y: 0 }
  },
  {
    test: 'Circular group',
    board: '?BBB?+\n' +
           '?B?B?+\n' +
           '?BBB?+\n' +
           '+???++\n' +
           '++++++\n' +
           '++++++\n',
    check: { x: 1, y: 0 }
  },
  {
    test: 'Partially surrounded group',
    board: 'BBBB?+\n' +
           'BBBW++\n' +
           '?WW+++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    check: { x: 0, y: 0 }
  },
  {
    test: 'Completely surrounded group',
    board: 'BBBBW+\n' +
           'BBBW++\n' +
           'WWW+++\n' +
           '++++++\n' +
           '++++++\n' +
           '++++++\n',
    check: { x: 0, y: 0 }
  }
];
