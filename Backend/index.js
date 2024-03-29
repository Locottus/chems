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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Content-Type', 'application/x-www-form-urlencoded');
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, PATCH");
  next();
});

app.get(`${apiURL}`, (request, response) => {
  response.json({ info: 'Node.js, Express, nginx  and Postgres API #CHEMS ' })
})

app.post(`${apiURL}login`, db.loginUser)
app.put(`${apiURL}password/reset`, db.resetPassword)

app.get(`${apiURL}usuarios`, db.getUsers)
app.post(`${apiURL}usuarios`, db.newUser)
app.put(`${apiURL}usuarios`, db.updateUsers)


app.get(`${apiURL}catalogo`, db.catalogo)
app.post(`${apiURL}catalogo`, db.insertaCatalogo)
app.put(`${apiURL}catalogo`, db.actualizaCatalogo)

app.get(`${apiURL}pedidos-mes`, db.pedidosMes)
app.post(`${apiURL}pedidos-mes`, db.savePedidosMes)
app.put(`${apiURL}pedidos-mes`, db.actualizaPedido)

app.get(`${apiURL}clientes`, db.clientes)
app.post(`${apiURL}clientes`, db.addClient)
app.put(`${apiURL}clientes`, db.actualizaClientes)

app.listen(port, () => {
  console.log(`App chemita backend running on port ${port}.`)
})


