// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting_dojo');
// Create a Schema for Users
var QuoteSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 5},
 quote: {type: String, required: true, minlength: 5},
 date: {type: Date, default: Date.now},
}, {timestamps: true})
// Store the Schema under the name 'User'
mongoose.model('Quote', QuoteSchema);
// Retrieve the Schema called 'User' and store it to the variable User
var Quote = mongoose.model('Quote');
// Routes
// Root Request
app.get('/', function(req, res) {
    res.render("index")
})

app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var quote = new Quote(req.body);
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  quote.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
        console.log(err.message);
      res.render("index", {title: "You have errors!", errors: err})
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a quote!');
      res.redirect("/")
    }
  })
})

app.get('/quotes', function(req, res){
    Quote.find({}, function(err, quotes) {
    if (err){
        res.render("quotes", {title: "Could not get info from database!", errors: quote.errors})
    }
    else{
        console.log("quotes")
        res.render('quotes', {quotes: quotes});
    }
  })
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})