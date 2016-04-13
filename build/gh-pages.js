var ghpages = require('gh-pages');
var path = require('path');
var ora = require('ora')

var spinner = ora('publishing to GitHub Pages...')
spinner.start()

ghpages.publish(path.join(__dirname, '../dist'), function(err) {
  spinner.stop();
  if (err) throw err;
});
