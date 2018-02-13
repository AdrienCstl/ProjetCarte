let express = require('express')
let app = express()  // Charge express

let db = require('script.je')


app.set('view engine','ejs') // set ejs as 'html' view engine

app.use('/assets',express.static('public')) //define the route for everything in public. but need the prefix /assets (not needed but interrested)
app.use(express.static('images'))
app.set('views', path.join(__dirname, './'))
app.get('/', function (request,response) {
    response.render('frontEnd/index')
    db.connection()
})

app.listen(8080)

