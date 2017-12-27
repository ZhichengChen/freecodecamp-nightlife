
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
  
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

passport.use(new Strategy({
    consumerKey: 'FdvbWFwr5UghZaL6O9prhpbvx',
    consumerSecret: 'mjf3TFjgvBAXYxVBXgw9gDa9uUiAtBySmlGQfj4e9TLaYYeR5b',
    callbackURL: 'https://freecodecamp-dynamic-nightlife.herokuapp.com/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, cb) {
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


var app = express();

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/auth/twitter',
  passport.authenticate('twitter'));
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),routes.search);
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function login(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/twitter');
  } else {
    next();
  }
}

app.get('/', routes.index);
app.post('/', routes.search);
app.get('/users', user.list);
app.get('/go/:id', login, routes.go, routes.search)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
