let express = require('express')
let app = express()  // Charge express

let db = require('./script.js')


app.set('view engine','ejs') // set ejs as 'html' view engine

//app.use(express.static('frontEnd')) //define the route for everything in frontEnd. but need the prefix /assets (not needed but interrested)
app.get('/', function (request,response) {

    db.connection()

    response.render('../frontEnd/index')
})

app.listen(8080)




