
//connection to the mongodb database with mongoose

function connection(){
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://projetcarte_test:test@mongodb-projetcarte.alwaysdata.net/projetcarte_bd');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
	  console.log("connection succesfull");
	});
}

