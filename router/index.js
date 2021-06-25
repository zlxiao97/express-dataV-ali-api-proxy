const express = require('express')
const superagent = require('superagent')
const qs = require('qs')
const stream = require('stream')
const xlsx = require('node-xlsx').default
const apiConfig = require('../config/api')
const router = express.Router()
const { AppCode } = apiConfig

const getData = (query) => {
  const params = {
    code: '600004',
    time: 'day'
  }
  return new Promise((resolve, reject) => {
    superagent.get(`http://ali-stock.showapi.com/realtime-k?${qs.stringify(params)}`).set('Authorization', `APPCODE ${AppCode}`).end((err, result) => {
      const resObj = JSON.parse(result.text)
      const list = resObj.showapi_res_body.dataList
      resolve(list && list.slice(0, query && query.count && +query.count))
    })
  })
}

router.get('/stock', (req, res) => {
  getData({ count: req.query.count }).then((list) => res.send(list))
})

router.post('/export', (req, res) => {
  getData().then((list) => {
    const header = Object.keys(list[0])
    const data = list.reduce((acc, cur) => {
      const values = Object.keys(cur).map(key => cur[key])
      return [...acc, values]
    }, [header])
    const buffer = xlsx.build([{ name: "mySheetName", data: data }]); // Returns a buffer
    const readStream = stream.PassThrough()
    readStream.end(buffer)
    const fileName = 'test.xlsx'
    res.set('Content-disposition', 'attachment; filename=' + fileName);
    res.set('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    readStream.pipe(res)
  })
}
)

module.exports = router