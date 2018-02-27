let express = require('express')
let app = express()  // Charge express

let db = require('./scriptBD.js')
//let path = require('path')
let bodyParser = require('body-parser')

//app.set('view engine','ejs') // set ejs as 'html' view engine
//app.set('views', path.join(__dirname, '/public')) //set 'public' as directory name instead of views (by default)

app.use('/public',express.static('public')) //define the route for everything in public with the prefix /public (not needed but interrested)


//Change the default parser by body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


console.log('Serveur lancé');

app.get('/', function (request,response) { //function which send the next content each time the user get to '/'

    response.sendFile(__dirname + '/index.html');
	console.log('Nouveau visiteur');
    //response.render('index')
});

//Get data depending of params
app.post('/data', function (request,response) {
	db.connection();
	if(request.body.name)
	{
		db.getDataByName(response);
	}
	else if(request.body.type)
	{
		db.getDataByType(response);
	}
	else{
		db.getData(response);
	}
});

app.listen(8080)

