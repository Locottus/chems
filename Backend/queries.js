const Pool = require('pg').Pool

 const pool = new Pool({
   user: 'postgres',
   host: '127.0.0.1',
   database: 'chemita',
   password: 'Guatemala1',
   port: 5432,
 });


const meses = [
  {
      "mes": "Enero",
      "id": "1",
  },
  {
      "mes": "Febrero",
      "id": "2",
  },
  {
      "mes": "Marzo",
      "id": "3",
  },
  {
      "mes": "Abril",
      "id": "4",
  },
  {
      "mes": "Mayo",
      "id": "5",
  },
  {
      "mes": "Junio",
      "id": "6",
  },
  {
      "mes": "Julio",
      "id": "7",
  },
  {
      "mes": "Agosto",
      "id": "8",
  },
  {
      "mes": "Septiembre",
      "id": "9",
  },
  {
      "mes": "Octubre",
      "id": "10",
  },
  {
      "mes": "Noviembre",
      "id": "11",
  },
  {
      "mes": "Diciembre",
      "id": "12",
  },
];

const loginUser = (request, response) => {
  const { usuario, clave } = request.body
  var q = `select count(*) from usuarios where usuario = '${usuario}' and clave = '${clave}' `;
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
  })
}


const catalogo = (request, response) => {
  var q = `select * from catalogo order by id`;
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
  })
}

const insertaCatalogo = (request, response) => {
  const { id, nombre, empresa, presentacion, precio } = request.body
  var q = `insert into catalogo (id, nombre, empresa, presentacion, precio) 
           values
           ('${id}', '${nombre}', '${empresa}', '${presentacion}', ${precio});`;
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json('{"msg":"Success"}');
  })
}

const actualizaCatalogo = (request, response) => {
  let errors = 0;
  for (let i = 0; i < request.body.length; i++) {
    const { id, nombre, empresa, presentacion, precio } = request.body[i];
    var q = `update catalogo  set nombre = '${nombre}', empresa = '${empresa}', 
              presentacion = '${presentacion}', precio = ${precio}
              where ${id} = id`;
    pool.query(q, (error, results) => {
      if (error) {
        errors = errors + 1;
      }
    })
  }
  response.status(200).json(`{"msg":"Success", "errors": ${errors}}`);
}


const getmeses = (request, response) => {
  response.status(200).json(meses);
}

const pedidosMes = (request, response) => {
  const fechaInicio = request.query.fechaInicio;
  const fechaFin = request.query.fechaFin;
  //console.log(fechaInicio,fechaFin);
  var q = `
            select
            ID,TITLE,to_char("date", 'YYYY-MM-DD') AS DATE,
            DETALLE,NOMBRE,TELEFONO,UBICACION,NOTA,
            HORA,RECORDATORIO  
            from pedido where date between '${fechaInicio}' and '${fechaFin}'  
            order by date asc `;
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
  })
}

const savePedidosMes = (request, response) => {
  const { title, date, detalle, nombre, telefono, ubicacion, nota, hora, recordatorio, detalleJson } = request.body
  var q = `insert into pedido (title, date, detalle, nombre, telefono, ubicacion, nota, hora, recordatorio, detalleJson) 
           values
           ('${title}', '${date}', '${detalle}', '${nombre}', '${telefono}', '${ubicacion}', '${nota}', '${hora}', '${recordatorio}', '${JSON.stringify(detalleJson)}');`;
    pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json('{"msg":"Success"}');
  })
}

module.exports = {
  loginUser,
  catalogo,
  pedidosMes,
  savePedidosMes,
  getmeses,
  insertaCatalogo,
  actualizaCatalogo,
  }
  
