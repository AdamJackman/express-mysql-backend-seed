var mysql = require('mysql');

var connection = mysql.createConnection({
	
	host: 'localhost',
	user: 'unilateraladmin',
	password: 'password',
	database: 'unilateral'

});

connection.connect(function(error){
	if(error) {
		console.error('error creating a connection: ' + error.stack);
		return;
	}
});

module.exports = connection;
