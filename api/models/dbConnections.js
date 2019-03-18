var mysql = require('mysql');
    port = process.env.PORT || 3000;

if (port === 3000) {

    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Password3',
        database: 'teacherly',
        insecureAuth: true
    });
} else {

   //same as above, with live server details
}

connection.connect();

module.exports = connection;