/**
 * Created by Steven on 12/14/2016.
 */

var express = require('express');
var route = express.Router();

route.get('/', function (req, res) {
    //res.render('partials/example', {object: data});
    res.render('index');
});

route.get('/about',function(req,res){
   res.render('about');
});

route.get('/contact',function(req,res){
    res.render('contact');
});
// route.post('/', function (req, res, next) {
//
// });

module.exports = route;