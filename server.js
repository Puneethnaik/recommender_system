var connection = require('./mysql-connector-object');
var express = require('express');
var bodyParser = require('body-parser');
var login = require('./routes/api/loginAPI');
var ejs = require('ejs');
var path = require('path'); 
var session = require('client-sessions');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//sessions
app.use(session({
    cookieName : 'session',
    secret : 'time_scheduler_session'
}));


//set your static folder path.
app.use(express.static(path.join(__dirname, 'public')));

//CORS
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//---------------Login/Register Routing-------------------------------
var router = express.Router();
router.get('/', function(req, res){
    
});

router.post('/register', login.register);
router.post('/login', login.login);

app.use('/api/loginlogout', router);
//---------------------------------------------------------------------

app.use('/user', require('./routes/user'));

// recommender system apis
// app.use('/recommender', require('./routes/api/recommenderAPI'))

app.get('/', function(req, res){
    res.end("Not Allowed");
});

app.get('/login', function(req, res){
    res.render('login.ejs', {title : "hello please login", type : "good"})
})

app.get('/register', function(req, res){
    res.render('register.ejs', {type : "good"});
});

app.get('/profile', function(req, res){
    if(!req.session.user)res.redirect('/login');
    else
        res.render('dashboard.ejs', {title:'Dashboard', user : req.session.user});
});

app.get('/logout', function(req, res){
    req.session.user = undefined;
    res.redirect('/profile');
})

app.listen(3000, function(req, res){
    console.log("Server connected and serving at port 3000");
});

