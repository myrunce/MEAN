
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
var session = require('express-session');
app.use(session({secret: 'codingdojorocks'}));  // string for encryption

app.get('/', function(req, res){
    res.render("index");
})

app.post('/process', function(req, res){
    console.log(req.body);
    req.session.name = req.body.name;
    req.session.location = req.body.dojoLocation;
    req.session.language = req.body.favLanguage;
    req.session.comment = req.body.comment;
    res.redirect("/results");
})

app.get('/results', function(req, res){
    res.render("results", {name: req.session.name, location: req.session.location, language: req.session.language, comment: req.session.comment});
})

app.listen(8000, function() {
 console.log("listening on port 8000");
});