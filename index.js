const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const url = 'mongodb://localhost:27017'
const dbName = 'profile'

app.set('PORT', 3000)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    const db = client.db(dbName)
    db.collection('users').find().toArray()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ msg: 'err'}))
    client.close()
  })
})

app.post('/', (req, res) => {
  const userInfo = req.body

  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    const db = client.db(dbName)
    db.collection('users').insertOne(userInfo)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ msg: 'err'}))
    client.close()
  })
})

/* get user infomation from mongodb */
app.get('/:id', (req, res) => {
  const { id } = req.params
  const obj_id = new ObjectId(id)
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    const db = client.db(dbName)
    db.collection('users').findOne({ _id: obj_id })
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ msg: 'err'}))
    client.close()
  })
})
/* go to update form */
app.get('/edit/:id', (req, res) => {
  const { id } = req.params
  const obj_id = new ObjectId(id)
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    const db = client.db(dbName)
    db.collection('users').findOne({ _id: obj_id })
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ msg: 'err'}))
    client.close()
  })
})
app.put('/:id', (req, res) => {
  const { id } = req.params
  const objId = new ObjectId(id)
  const userInfo = req.body
  console.log(userInfo._id)

  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    const db = client.db(dbName)
    db.collection('users').updateOne(
      { _id: objId },
      {
        $set: {
          image: userInfo.image,
          category: userInfo.category,
          name: userInfo.name,
          mobile: userInfo.mobile,
          email: userInfo.email,
          birthDay: userInfo.birthDay,
          sex: userInfo.sex,
          age: userInfo.age,
          blood: userInfo.blood,
          job: userInfo.job,
          hobby: userInfo.hobby,
          nickName: userInfo.nickName,
          religion: userInfo.religion,
          userAddress: {
            address: userInfo.userAddress.address,
            street: userInfo.userAddress.street,
            zipCode: userInfo.userAddress.zipCode
          },
          company: {
            name: userInfo.company.name,
            departments: userInfo.company.departments,
            position: userInfo.company.position
          },
          character: userInfo.character
      }
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ msg: 'err'}))
    client.close()
  })


})
app.listen(app.get('PORT'), () => {
  console.log(` server started ... PORT: ${app.get('PORT')} `)
})