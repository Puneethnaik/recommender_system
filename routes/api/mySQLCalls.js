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

module.exports = {
    'getMovies' : getMovies
}