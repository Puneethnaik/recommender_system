//mysql 
var mysql  = require('mysql');
var connection = mysql.createConnection({
    host:process.env['MYSQL_HOST'],
    user:process.env['MYSQL_USER'],
    password:process.env['MYSQL_PASSWORD'],
    database:process.env['MYSQL_DATABASE']
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