//Webserver configuration
const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./api/routes/teacherlyRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Teacherly RESTful API server started on: ' + port);