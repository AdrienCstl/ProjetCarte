let express = require('express')
let app = express()  // Charge express

//app.set('view engine','ejs') // set ejs as 'html' view engine

app.use('/assets',express.static('public')) //define the route for everything in public. but need the prefix /assets (not needed but interrested)
app.use(express.static('images'))
app.get('/', function (request,response) {
    response.render('frontEnd/index')

})

app.listen(8080)