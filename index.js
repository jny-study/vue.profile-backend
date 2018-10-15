const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'test'

app.set('PORT', 3000)

app.get('/', (req, res) => {
  const user = { id: 'hello', pw: 'password' }
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    const db = client.db(dbName)
    db.collection('users').insertOne(user, (err, result) => {
      if(err) res.send({ err: 'fuck!' })

      res.send(result)
      client.close()

    })
  })
})

app.listen(app.get('PORT'), () => {
  console.log(` server started ... PORT: ${app.get('PORT')} `)
})