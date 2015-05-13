express = require 'express'
path = require 'path'
bodyParser = require 'body-parser'
morgan = require 'morgan'
cookieParser = require 'cookie-parser'

app = express()
port = process.env.PORT || 5000

app.use express.static path.join __dirname, 'build'
app.set 'views', path.join __dirname, 'views'
app.use bodyParser.urlencoded { extended: true }
app.use bodyParser.json()
app.use cookieParser()
app.use morgan 'combined'

app.set 'view engine', 'html'
app.enable 'view cache'
app.engine 'html', require 'hogan-express'

require('./app/routes') app

app.listen port
console.log 'Magic happens on port ' + port
exports = module.exports = app