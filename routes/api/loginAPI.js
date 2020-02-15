var connection = require('../../mysql-connector-object');
var login = function(req, res){
    console.log("login callback");
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
        // console.log("error ocurred",error);
        res.send({
        "code":400,
        "failed":"error ocurred"
        })
    }else{
        // console.log('The solution is: ', results);
        if(results.length >0){
            console.log(results[0].password + " " + password);
            if(results[0].password === password){
            req.session.user = results[0].id;
            res.redirect('/user/profile');
            /* res.send({
            "code":200,
            "success":"login sucessfull"
                }); */
            }
            else{
                res.send({
                "code":204,
                "success":"Email and password does not match"
                    });
            }
        }
        else{
        res.send({
            "code":204,
            "success":"Email does not exits"
            });
        }
    }
    });
}

var register = function(req, res){
    console.log("register callback");
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var user = {
        name:name,
        email:email,
        password:password
    }
    console.log("the connection object is ", connection);
    connection.query("INSERT INTO users SET ?", user, function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          res.send({
            "code":200,
            "success":"user registered sucessfully"
              });
        }
        });
}
module.exports = {
    login:login,
    register:register
}