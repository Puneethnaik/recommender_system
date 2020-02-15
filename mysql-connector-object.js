//mysql 
var mysql  = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'recommender',
    password:'',
    database:'recommender_system',
})

connection.connect(function(err){
    if(err){
        console.log("something wrong. Could not connect with database", err);
        throw err;
    }
    else {
        console.log("mysql successfully connected");
        console.log("Exporting the connection object");
    }
})


module.exports = connection;