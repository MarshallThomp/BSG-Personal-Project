const express = require('express')
const massive = require('massive')
const session = require('express-session')
const AWS = require('aws-sdk')
require('dotenv').config()

const AuthCtrl = require('./controllers/auth')
const DogCtrl = require('./controllers/dogController')

const app = express()

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

const S3 = new AWS.S3()

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

//// S3 ////
app.post('/api/s3', (req, res) => {
    const photo = req.body
    const buf = new Buffer(photo.file.replace(photo.file.replace(/^data:image\/\w+;base64,/, ''), 'base64'))

    const params = {
        Bucket: process.env.AWS_BUCKET,
        Body: buf,
        Key: photo.filename,
        ContentType: photo.fileType,
        ACL: 'public-read'
    }

    S3.upload(params, (err, data) => {
        let response, code
        if (err) {
            response = err
            code = 500
        } else {
            response = data
            code = 200
        }
        res.status(code).send(response)
    })
})
