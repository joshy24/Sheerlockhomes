'use  strict'

var path = require('path');
var request = require('request');
var http = require('http');
var querystring = require('querystring');
var express = require('express');
global.mongoose = require('mongoose');
global.passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
mongoose.Promise = require('bluebird');
var ejs_layouts = require('express-ejs-layouts');

global.app = express();

require('./passport_config')(passport);

const bodyParser = require('body-parser');
global.config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.disable('x-powered-by');

app.use(ejs_layouts);
//app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.set('layout', './layouts/layout');

app.use(session({ secret: 'thisissheerlockssecretkey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/auth');
require('./routes/users')

app.listen(config.port, function(){
   console.log("Express started on " +config.base_url +' in '+config.env +' environment. Press Ctrl + C to terminate')
   global.db = mongoose.connect(config.db.uri)
})
