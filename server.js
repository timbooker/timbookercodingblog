
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.locals({
  moment: require('moment')
});

var Poet = require('poet');

var poet = Poet(app, {
  postsPerPage: 5,
  posts: './_posts',
  metaFormat: 'json'
});
poet.init().then(function() {
  // initialized
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(app.routes);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) { res.render('index'); });

app.get('/rss', function (req, res) {
  // Only get the latest posts
  var posts = poet.helpers.getPosts(0, 5);
  res.setHeader('Content-Type', 'application/rss+xml');
  res.render('rss', { posts: posts });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
