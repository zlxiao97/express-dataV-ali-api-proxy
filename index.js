const express = require('express')
const path = require('path')
const cors = require('cors');
const expressConfig = require('./config/express')
const { port } = expressConfig
const router = require('./router')
const app = express()

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(cors());

app.use(router)


app.listen(port, () => {
  console.log(`server is listening on ${port} !`)
})