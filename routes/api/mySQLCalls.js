const mysql = require('mysql');


var getMovies = function(callback){
    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'recommender_system'
    })
    connection.query("SELECT * FROM movies", function(error, results, fields){
        if(error){
            return "error"; 
        }
        callback(results);
    })
}
function addMovieRating(movieID, userID, rating){
    //this function inserts/updates movie rating by a user to a movie
    var query = "SELECT * FROM ratings WHERE movieID = " + movieID + " AND userID = " + userID;
    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'recommender_system'
    })
    connection.query(query, function(error, results, fields){
        if(error){
            console.log(error);
            return "error"; 
        }
        console.log(results)
        if(results.length > 1){
            //the record exists in the database. we should issue update command
            query = "UPDATE ratings SET rating = " + rating + " WHERE movieID = " + movieID + " AND userID = " + userID;
            connection.query(query, function(error, results, fields){
                if(error){
                    console.log(error);
                    return "error";
                }
                console.log("updated successfully");
            })
        }
        else{
            //the record does not exist in the database. issue insert command
            query = "INSERT INTO ratings(userID, movieID, rating) VALUES(" + userID + ", " + movieID + ", " + rating + ")";
            connection.query(query, function(error, results, fields){
                if(error){
                    console.log(error);
                    return "error";
                }
                console.log("inserted successfully");
            })
        }
    })
}

module.exports = {
    'getMovies' : getMovies,
    'addMovieRating' : addMovieRating
}