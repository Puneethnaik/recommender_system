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
    res.send("successfully logged in...")
})


module.exports = router;