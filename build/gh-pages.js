var ghpages = require('gh-pages');
var path = require('path');
var ora = require('ora')

var spinner = ora('publishing to GitHub Pages...')
spinner.start()

let options = {};
if (process.env.GH_TOKEN) {
  options.repo = 'https://' + process.env.GH_TOKEN + '@github.com/petejohanson/vuego.git';
}

ghpages.publish(path.join(__dirname, '../dist'), options,
  function(err) {
    spinner.stop();
    if (err) throw err;
  }
);
