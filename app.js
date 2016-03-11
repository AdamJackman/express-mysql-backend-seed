var express = require('express');
var app = express();
var db = require('./db');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;

});

app.get('/', function (req, res) {  
    res.send('Adam Jackman: Express mysql seed');
});

app.get('/testSelect', function (req, res) {
    var queryString = 'select * from users';
    runQuery( queryString, res );
});

app.get('/testSelect/:id', function (req, res) {
    var queryString = "select * from users where id=?";
    var id = req.params.id;
    runPreparedStatment(queryString, id, res);
});

/*
* Create a helper to query the database
* Note that db.query is asynchronous
*/
function runQuery( queryString , res){
    var query = db.query( queryString, function(err, result){
        if(err){
            console.log('Error in query: ' + err);
        } else {
            sendJSON(result, res);
        } 
    });
}

/*
* Create a helper for a simple single prepared statement
* Note that db.query is asynchronous.
*/
function runPreparedStatment( queryString, val, res){
    var resultSet_;
    var query = db.query( queryString, val, function(err, result){
       if(err){
           console.log('Error in prepared statement: ' + err);
       } else {
           sendJSON(result, res);
       }
    });
}

function sendJSON( toSend, res){
    res.setHeader('Content-Type', 'application/json');
    res.json(toSend);
}