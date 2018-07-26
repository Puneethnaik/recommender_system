const express = require("express");
const SQLCalls = require('./api/mySQLCalls');
const router = express.Router();
router.get('/movies', function(req, res){
    //this is the path where all the movies will be displayed and the user will be able to rate them.
    var callback = function(movies){
        //process data coming from api
        //the schema is [id, title, cast]
        // console.log(JSON.stringify(movies[0]))
        res.render("userMovies.ejs", {movies : movies});
    }
    SQLCalls.getMovies(callback);
})
router.get('/profile', function(req, res){
    //this will show the default profile of the user
    res.send("successfully logged in...");
})

router.post('/rateMovies', function(req, res){
    // console.log(JSON.stringify(req.body));
    ratings = req.body;
    for(var rating in ratings){
        if(ratings[rating] != 'NA'){
            console.log(rating + ratings[rating]); 
            SQLCalls.addMovieRating(rating.split('_')[1], req.session.user, ratings[rating]);
        }
    }
    res.send("something should happen here.");
})

module.exports = router;