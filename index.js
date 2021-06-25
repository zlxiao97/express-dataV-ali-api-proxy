const express = require('express')
const expressConfig = require('./config/express')
const { port } = expressConfig
const app = express()
const router = require('./router')

app.use(router)


app.listen(port, () => {
  console.log(`server is listening on ${port} !`)
})