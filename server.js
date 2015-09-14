var express = require('express'),
  cors = require('cors'),
  path = require('path'),
  timeout = require('connect-timeout'),
  compress = require('compression');

var app = express();
app.set('port', 8080);

app.use(cors());
app.use(timeout('20s'));
app.use(compress());

// Serve static files at /static and cache them for one day
app.use('/static', express.static(path.join(__dirname, 'static'), { maxAge: 86400000 }));
app.use(haltOnTimeout);

function haltOnTimeout(req, res, next) {
  if (!req.timeout) {
    next();
  }
}

app.listen(app.get('port'), function() {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running on port ' + app.get('port'));
  }
});
