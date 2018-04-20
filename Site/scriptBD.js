//connection to the mongodb database with mongoose
var mongoose = require('mongoose');

//Bd de test
var schema = new mongoose.Schema({type: String, nom: String, adresse: String,
codepostal: String, email: String, geometry: { coordinates: [ [Number], [Number] ] }
  });
var lieuxTest = mongoose.model('lieux', schema, 'lieux');

//Bd de google
var schemaGoogle = new mongoose.Schema({
    name: String,
    type: String,
    address: String,
    postcode: String,
    town: String,
    pos: {x: Number, y:Number},
    phone: String,
    website: String,
    hours: [String],
    price: String,
    rating: Number,
    icon: String,
    photos: [String],
    reviews: [{author: String,rating: Number, text: String, time: Number}],

});

//Collection de google
var google = mongoose.model('google', schemaGoogle, 'google');

//Definis quel bd on utilise
var lieux = google;

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

    //L'option i permet d'éviter les case sensitive
	lieux.find({name: new RegExp(name, "i")}).exec(function (err, lieu)
	{
		if (err) return handleError(err);
		res.json(lieu);
	});
}

//Send data with a specified type
exports.getDataByType = function(res, type){
	lieux.find({type: type}).exec(function (err, lieu)
	{
		if (err) return handleError(err);
		res.json(lieu);
	});
}

//Send data with a specified name and a specified type
exports.getDataByNameAndType = function(res, newName, type){
	lieux.find({name: new RegExp(newName,"i"), type: type}).exec(function (err, lieu)
	{
		if (err) return handleError(err);
		res.json(lieu);
	});
}



exports.addData = function(res, data, type)
{
	var ObjectID = require('mongodb').ObjectID;
	for(var i = 0; i < data.length; i++)
	{
        data[i]._id = new ObjectID();
		google.create(data[i]);
	}
}
