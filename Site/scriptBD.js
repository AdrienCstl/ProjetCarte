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

//Send data with a specified name and a specified type
exports.getDataByNameAndType = function(res, name, type){
	lieux.find({nom: name, type: type}).exec(function (err, lieu) 
	{
		if (err) return handleError(err);
		res.json(lieu);
	});
}

exports.addData = function(res, data)
{
	var ObjectID = require('mongodb').ObjectID;
	for(var i = 0; i < data.length; i++)
	{
		lieuxGoogle.insert(data[i]);
	}
}


//Bd de test
var schema = new mongoose.Schema({type: String, nom: String, adresse: String,
codepostal: String, email: String, geometry: { coordinates: [ [Number], [Number] ] }
  });
var lieuxTest = mongoose.model('lieux', schema, 'lieux');

//Bd de google
var schemaGoogle = new mongoose.Schema({ 
    name: String,
    type: String,
    adress: String,
    phone: String,
    website: String,
    hours: [String],
    price: String,
    rating: Number,
    icon: String, 
    reviews: [{author: String,rating: Number, text: String, time: Number}] 
});
  
var lieuxGoogle = mongoose.model('lieuxGoogle', schemaGoogle, 'lieuxGoogle');

//Definis quel bd on utilise
var lieux = lieuxTest;


