/**
 * Created by Steven on 12/14/2016.
 */

var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var engine = require('ejs-mate');
var game = require('./routes/game');
var index = require('./routes/index');

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('/views', path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static('public'));
app.use(session({ secret: 'eiGames', resave: true, saveUninitialized: true, cookie: { maxAge: 86400000, httpOnly: false, secure: false }}));
var auth = require('./routes/auth');

app.use('/game',deserialize);
app.use('/',index);
app.use('/game',game);
app.use('/game/auth',auth);


function deserialize(req,res,next){
    if(!req.user){
        if(req.session && req.session.passport && req.session.passport.user){
            req.user = req.session.passport.user;
        }
        else{
            if(req.path != '/' && req.path != '/auth/google' && req.path != '/auth/google/callback')
                return res.redirect('/');
        }
    }
    next();
}

app.listen(3000, function(){console.log("Listening on Port 3000")});