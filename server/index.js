const express = require('express')
const massive = require('massive')
const session = require('express-session')
require('dotenv').config()

const AuthCtrl = require('./controllers/auth')
const DogCtrl = require('./controllers/dogController')

const app = express()

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env



app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log('port on', SERVER_PORT))
}).catch(error => console.log('it is the db', CONNECTION_STRING))
///AUTHORIZATION///
app.post('/auth/register', AuthCtrl.register)
app.post('/auth/login', AuthCtrl.login)
app.get('/auth/logout', AuthCtrl.logout)
app.get('/auth/currentUser', AuthCtrl.currentUser)

//// Dog Endpoints ////
app.get('/api/dogs/:id', DogCtrl.getDog)
app.get('/api/dogs', DogCtrl.getAllDogs)
app.post('/api/dogs', DogCtrl.createDog)
app.delete('/api/dogs/:id', DogCtrl.deleteDog)
app.put('/api/dogs', DogCtrl.updateDog)