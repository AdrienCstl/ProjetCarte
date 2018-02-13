let express = require('express')
let app = express()  // Charge express

let db = require('./script.js')


app.set('view engine','ejs') // set ejs as 'html' view engine

app.use(express.static('frontEnd')) //define the route for everything in public. but need the prefix /assets (not needed but interrested)
app.get('/', function (request,response) {
    response.render('../frontEnd/index')
    db.connection()
})

app.listen(8080)




