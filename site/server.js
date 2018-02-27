let express = require('express')
let app = express()  // Charge express

let db = require('./scriptBD.js')
//let path = require('path')


//app.set('view engine','ejs') // set ejs as 'html' view engine
//app.set('views', path.join(__dirname, '/public')) //set 'public' as directory name instead of views (by default)

app.use('/public',express.static('public')) //define the route for everything in public with the prefix /public (not needed but interrested)

console.log('Serveur lancé');

app.get('/', function (request,response) { //function which send the next content each time the user get to '/'

    response.sendFile(__dirname + '/index.html');
	console.log('Nouveau visiteur');
    //response.render('index')
})

//Get all data
app.get('/data', function (request,response) { //function which send the next content each time the user get to '/'
	
    db.connection(response)
	db.getData(response);
})

app.listen(8080)

