const express = require('express')
const superagent = require('superagent')
const qs = require('qs')
const apiConfig = require('../config/api')
const router = express.Router()
const { AppCode } = apiConfig

router.get('/stock', (req, res) => {
  const params = {
    code: '600004',
    time: 'day'
  }
  superagent.get(`http://ali-stock.showapi.com/realtime-k?${qs.stringify(params)}`).set('Authorization', `APPCODE ${AppCode}`).end((err, result) => {
    res.send(result.text)
  })
})

module.exports = router