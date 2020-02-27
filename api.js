const express = require('express')
const app = express()
const port = 3001

const db = require('./dbqueries.js')

function incomingRequestLogger (req, res, next){
    console.log('Request made on:', req.originalUrl)
    next()
}

function errorHandler (err, req, res, next){
    console.error('ERROR OCCURED:', err)
    res.status(500).send(err)
    next()
}

function responseSender (req, res, next){
    console.log('response obj: ', res.status)

}

app.use(express.json()) //without this req.body is undefined
app.use(incomingRequestLogger)
//app.use(errorHandler)
// app.use(responseSender)

app.get('/publishers', db.getPublishers)

app.get('/games', db.getGames)

app.get('/reviews', db.getReviews)


app.listen(port, () => console.log('Apps listening on port ',port, '!'))