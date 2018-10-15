const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'profile'

app.set('PORT', 3000)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
})
app.post('/', (req, res) => {
  console.log(req.body)
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    const db = client.db(dbName)
    db.collection('users').insertOne({}, (err, result) => {
      if(err) res.json({ err: 'fuck!' })
      client.close()
    })
  })
})

app.listen(app.get('PORT'), () => {
  console.log(` server started ... PORT: ${app.get('PORT')} `)
})