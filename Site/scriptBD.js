//connection to the mongodb database with mongoose
var mongoose = require('mongoose');

exports.connection = function (){
    mongoose.connect('mongodb://projetcarte_test:test@mongodb-projetcarte.alwaysdata.net:27017/projetcarte_bd');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("connection successfull");
		
    });
}

//Send all the data
exports.getData = function(res) {
	
	lieux.find({}).exec(function (err, lieu) 
	{
		if (err) return handleError(err);
		console.log(lieu);
		res.json(lieu);
	});
}

//Send data with a specified name
exports.getDataByName = function(res, name){
	lieux.find({nom: name}).exec(function (err, lieu) 
	{
		if (err) return handleError(err);
		res.json(lieu);
	});
}

//Send data with a specified type
exports.getDataByType = function(res, type){
	lieux.find({type: type}).exec(function (err, lieu)
	{
		console.log(type);
		if (err) return handleError(err);
		res.json(lieu);
	});
}

var schema = new mongoose.Schema({type: String, nom: String, adresse: String,
codepostal: String, email: String, geometry: { coordinates: [ [Number], [Number] ] }
  });
var lieux = mongoose.model('lieux', schema, 'lieux');
