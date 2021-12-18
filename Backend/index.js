const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;
const apiURL = '/api/'
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get(`${apiURL}`, (request, response) => {
  response.json({ info: 'Node.js, Express, nginx  and Postgres API #CHEMS ' })
})

app.get(`${apiURL}getestaciones`, db.getestaciones)
app.get(`${apiURL}getanios`, db.getyears)
app.get(`${apiURL}getmeses`, db.getmeses)
app.get(`${apiURL}getdata`, db.getdata)


app.listen(port, () => {
  console.log(`App chems backend running on port ${port}.`)
})


