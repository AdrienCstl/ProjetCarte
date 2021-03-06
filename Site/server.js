let express = require('express')
let app = express()  // Charge express

let db = require('./scriptBD.js')
//let path = require('path')
let bodyParser = require('body-parser')

//app.set('view engine','ejs') // set ejs as 'html' view engine
//app.set('views', path.join(__dirname, '/public')) //set  'public' as directory name instead of views (by default)

//Change le nombre de requete max au serveur
require('events').EventEmitter.prototype._maxListeners = 100;

app.use('/public',express.static('public')) //define the route for everything in public with the prefix /public (not needed but interrested)




//Change the default parser by body parser
app.use(bodyParser.json({limit: '50mb'}));


//Taille des parametres
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 10000000,
    limit: '50mb'
}));

console.log('Serveur lancé');

app.get('/', function (request,response) { //function which send the next content each time the user get to '/'

    response.sendFile(__dirname + '/index.html');
	console.log('Nouveau visiteur');
    //response.render('index')
});

//Get data depending of params
app.post('/data', function (request,response) {
	db.connection();

    //TODO: Elle est inutile non ?
	if(request.body.name && request.body.type)
	{
		db.getDataByNameAndType(response, request.body.name, request.body.type);
	}
	else if(request.body.name)
	{
		db.getDataByName(response, request.body.name);
	}
    else if(request.body.type == "all"){
		db.getData(response);
	}
	else if(request.body.type)
	{
		db.getDataByType(response,request.body.type);
	}

});


app.post('/addData', function(request,response){

	//If threre is the good param
	if(request.body.data && request.body.type)
	{
		db.connection();
		db.addData(response, request.body.data, request.body.type);
	}

});

app.get('/importData', function(request,response){
	response.sendFile(__dirname + '/data_collection.html');

});

app.listen(8080)
