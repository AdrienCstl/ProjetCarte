//connection to the mongodb database with mongoose
var mongoose = require('mongoose');



exports.connection = function (){
    console.log("test");
    mongoose.connect('mongodb://projetcarte_test:test@mongodb-projetcarte.alwaysdata.net:27017/projetcarte_bd');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("connection succesfull");
    });
}
