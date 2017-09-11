
var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/dog_dashboard');
autoIncrement.initialize(connection);

var DogSchema = new Schema({
 name: {type: String, required: true},
 owner: {type: String, required: true},
 breed: {type: String, required: true},
 age: {type: Number, required: true},
}, {timestamps: true})

DogSchema.plugin(autoIncrement.plugin, 'Dog');
var Dog = connection.model('Dog', DogSchema);

app.get('/', function(req, res) {
    Dog.find({}, function(err, dogs) {
    if (err){
        res.render("index", {title: "Could not get info from database!", errors: dog.errors})
    }
    else{
        res.render('index', {dogs: dogs});
    }
  })
})

app.get('/dogs/new', function(req, res) {
    res.render("newdog")
})

app.post('/dogs', function(req, res){
    let dog = new Dog(req.body);
    dog.save(function(err){
        if (err){
            console.log("**************")
            console.log(dog.errors);
            res.render('newdog', {title: 'you have errors!', errors: dog.errors})
        }
        else{
            res.redirect('/')
        }
    })
})

app.get("/dogs/destroy/:id", function(req, res){
    Dog.remove({_id: req.params.id}, function(err){
        if (err){
            res.render('index', {title: 'could not find id!', errors: dog.errors})
        }
        res.redirect('/')
    })
})

app.get("/dogs/edit/:id", function(req, res){
    console.log(req.params.id);
    Dog.find({_id: req.params.id}, function(err, dog){
        if (err){
            res.render('index', {title: 'could not find id!', errors: dog.errors})
        }
        console.log(dog)
        res.render('editdog', {dog: dog})
    })
})

app.post("/dogs/:id", function(req, res){
    Dog.update({_id: req.params.id}, {name: req.body.name, owner: req.body.owner, breed: req.body.breed, age: req.body.age}, function(err){
        if (err){
            res.render('index', {title: 'could not find id!', errors: dog.errors})
        }
        res.redirect('/')
    })
})

app.get("/dogs/:id", function(req, res){
     Dog.find({_id: req.params.id}, function(err, dog){
        if (err){
            res.render('index', {title: 'could not find id!', errors: dog.errors})
        }
        console.log(dog)
        res.render('dog', {dog: dog})
    })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})