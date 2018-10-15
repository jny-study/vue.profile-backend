const express = require('express')
const app = express()

app.set('PORT', 3000)

app.get('/', (req, res) => {
  res.send(JSON.stringify({ text: 'hello world' }))
})

app.listen(app.get('PORT'), () => {
  console.log(` server started ... PORT: ${app.get('PORT')} `)
})