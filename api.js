const express = require('express')
var multer = require('multer')
var posterStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './static/images/posters/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
var uploadPosters = multer({
    storage: posterStorage
})
const cors = require('cors')
const app = express()

const port = 3001

const allowedCorsOrigins = [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://95.73.203.246:80',
    'http://95.73.203.246:81',
    'http://95.73.203.246'
  ]

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
app.use(cors({origin: allowedCorsOrigins}))
app.use(incomingRequestLogger)
//app.use(errorHandler)
// app.use(responseSender)

app.get('/publishers', db.getPublishers)

app.post('/publishers', db.createPublisher)

// GAMES

app.get('/games', db.getGames)
app.post('/games', uploadPosters.single('poster'), db.createGame)

app.get('/reviews', db.getReviews)

// STUDIOS

app.get('/studios', db.getStudios)

app.post('/studios', db.createStudio)

// PLATFORMS

app.get('/platforms', db.getPlatforms)

app.post('/platforms', db.createPlatform)

app.get('/ageRestrictions', db.getAgeRestrictions)

// GENRES

app.get('/genres', db.getGenres)

app.post('/genres', db.createGenre)

app.listen(port, () => console.log('Apps listening on port ',port, '!'))