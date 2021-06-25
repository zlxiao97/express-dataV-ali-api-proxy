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
    const resObj = JSON.parse(result.text)
    const list = resObj.showapi_res_body.dataList
    res.send(list && list.slice(0, +req.query.count))
  })
})

module.exports = router