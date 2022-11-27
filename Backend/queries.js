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
  var q = `select * from catalogo `;
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
  console.log(q);
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
    const { id, nombre, empresa, presentacion, precio } = request.body;
    var q = `update catalogo  set nombre = '${nombre}', empresa = '${empresa}', 
              presentacion = '${presentacion}', precio = ${precio}
              where ${id} = id`;
    console.log(q);
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

  var q = `select * from pedidos where date between ${fechaInicio} and ${fechaFin} `;
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
  })
}

const savePedidosMes = (request, response) => {
  const { title, date, detalle, nombre, telefono, ubicacion, nota, hora, recordatorio } = request.body
  var q = `insert into pedido (title, date, detalle, nombre, telefono, ubicacion, nota, hora, recordatorio) 
           values
           ('${title}', '${date}', '${detalle}', '${nombre}', '${telefono}', '${ubicacion}', '${nota}', '${hora}', '${recordatorio}');`;
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json('{"msg":"Success"}');
  })
}






const getyears = (request, response) => {
 var q = 'select distinct year from historico_estaciones order by year desc'  ;
 pool.query(q, (error, results) => {
   if (error) {
     response.status(500).send('{"msg":"' + error + '"}');
   }
   console.log('#CLIMA GET Method ALL years');
   response.status(200).json(results.rows);
 })
}


const getdata = (request, response) => {
  const yyyy1 = request.query.yyyy1;
  const yyyy2 = request.query.yyyy2;
  //const mm1 = request.query.mm1;
  //const mm2 = request.query.mm2;
  const estacion = request.query.estacion;
  var q = 'select * from historico_estaciones where estacion = \'' + estacion +
   '\' and year between ' + yyyy1 + ' and ' +yyyy2  +
   ' and lluvia >=0 and tmax >=0 and tmin >=0 and etp >=0 and bc >= 0 ' 
   ;
  console.log(q);
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    console.log('#CLIMA GET data requested');
    response.status(200).json(results.rows);
  })
 }

 const getdata2 = (request, response) => {
  const yyyy1 = request.query.yyyy1;
  const yyyy2 = request.query.yyyy2;
  //const mm1 = request.query.mm1;
  //const mm2 = request.query.mm2;
  const estacion = request.query.estacion;
  const estacion2 = request.query.estacion2;
  var q = `
  select h1.estacion  "estacion1", h1.year "year", h1.mes "mes", h1.dia "dia", h2.estacion "estacion2", 
    h1.lluvia "lluvia1",h1.tmax "tmax1", h1.tmin "tmin1", h1.etp "etp1", h1.bc "bc1", h1.zona_vida "zona_vida1",
    h2.lluvia "lluvia2",h2.tmax "tmax2", h2.tmin "tmin2", h2.etp "etp2", h2.bc "bc2", h2.zona_vida "zona_vida2"
    from historico_estaciones h1, historico_estaciones h2
    where h1.estacion = '${estacion}'
    and h2.estacion = '${estacion2}'
    AND h1.year between ${yyyy1} and ${yyyy2}
    AND h2.year between ${yyyy1} and ${yyyy2}
    and h1.lluvia >= -10 and h1.tmax >= -10 and h1.tmin >= -10 and h1.etp >= -10 and h1.bc >= -10
    and h2.lluvia >= -10 and h2.tmax >= -10 and h2.tmin >= -10 and h2.etp >= -10 and h2.bc >= -10
    and h1.year = h2.year
    and h1.mes = h2.mes
    and h1.dia = h1.dia
  `
  console.log(q);
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    console.log('#CLIMA GET data requested');
    response.status(200).json(results.rows);
  })
 }


 const getdata3 = (request, response) => {
  const yyyy1 = request.query.yyyy1;
  const yyyy2 = request.query.yyyy2;
  //const mm1 = request.query.mm1;
  //const mm2 = request.query.mm2;
  const estacion = request.query.estacion;
  const estacion2 = request.query.estacion2;
  var q = `
  select h1.estacion  "estacion", h1.year "year", h1.mes "mes", h1.dia "dia", 
  h1.lluvia "lluvia",h1.tmax "tmax", h1.tmin "tmin", h1.etp "etp", h1.bc "bc", h1.zona_vida "zona_vida"
  from historico_estaciones h1
  where h1.estacion = '${estacion}'
  AND h1.year between ${yyyy1} and ${yyyy2}
  and h1.lluvia >=-10 and h1.tmax >=-10 and h1.tmin >=-10 and h1.etp >=-10 and h1.bc >= -10
  
  union

  select h1.estacion  "estacion", h1.year "year", h1.mes "mes", h1.dia "dia", 
  h1.lluvia "lluvia",h1.tmax "tmax", h1.tmin "tmin", h1.etp "etp", h1.bc "bc", h1.zona_vida "zona_vida"
  from historico_estaciones h1
  where h1.estacion = '${estacion2}'
  AND h1.year between ${yyyy1} and ${yyyy2}
  and h1.lluvia >=-10 and h1.tmax >=-10 and h1.tmin >=-10 and h1.etp >=-10 and h1.bc >= -10
  
  `
  console.log(q);
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    console.log('#CLIMA GET data requested');
    response.status(200).json(results.rows);
  })
 }



 const getdataAVG = (request, response) => {
  const yyyy1 = request.query.yyyy1;
  const yyyy2 = request.query.yyyy2;
  //const mm1 = request.query.mm1;
  //const mm2 = request.query.mm2;
  const estacion = request.query.estacion;
  var q = 'select estacion,year,mes,round(avg(lluvia),1) as "lluvia",round(avg(tmax),1) as "tmax", ' +
  'round(avg(tmin),1) as "tmin",round(avg(etp),1) as "etp",round(avg(bc),1) as "bc" , ' +
  'round( (avg(tmax) + avg(tmin))  / 2,1) as "tPromedio" ' +
  ' from historico_estaciones where estacion = \'' +
  estacion + '\' and year between ' + yyyy1 + ' and ' + yyyy2  +
  ' and lluvia >= 0 and tmax >= 0 and tmin >= 0 and etp >= 0 and bc >= 0 ' +
  ' group by estacion, year, mes order by year,mes '  ;
  console.log(q);
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    console.log('#CLIMA GET data AVG requested');
    response.status(200).json(results.rows);
  })
 }

 const getdataAVG2 = (request, response) => {
  const yyyy1 = request.query.yyyy1;
  const yyyy2 = request.query.yyyy2;
  //const mm1 = request.query.mm1;
  //const mm2 = request.query.mm2;
  const estacion = request.query.estacion;
  const estacion2 = request.query.estacion2;
  var q = `
  select H1.estacion "estacion1", H1.year,H1.mes,round(avg(H1.lluvia),1) as "lluvia1",round(avg(H1.tmax),1) as "tmax1", 
  round(avg(H1.tmin),1) as "tmin1",round(avg(H1.etp),1) as "etp1",round(avg(H1.bc),1) as "bc1" , 
  round( (avg(H1.tmax) + avg(H1.tmin))  / 2,1) as "tPromedio1",
  
  H2.estacion "estacion2", round(avg(H2.lluvia),1) as "lluvia2", round(avg(H2.tmax),1) as "tmax2", 
  round(avg(H2.tmin),1) as "tmin2", round(avg(H2.etp),1) as "etp2", round(avg(H2.bc),1) as "bc2" , 
  round( (avg(H2.tmax) + avg(H2.tmin))  / 2,1) as "tPromedio2" 
  

   from historico_estaciones H1, historico_estaciones H2 
   where H1.estacion  = '${estacion}'  and H2.estacion = '${estacion2}'
   and H1.year between ${yyyy1} and ${yyyy2}
   and H1.lluvia >= -10 and H1.tmax >= -10 and H1.tmin >= -10 and H1.etp >= -10 and H1.bc >= -10 
   and h2.lluvia >=-10 and h2.tmax >= -10 and h2.tmin >= -10 and h2.etp >= -10 and h2.bc >= -10
	 and h1.year = h2.year
	 and h1.mes = h2.mes
	 and h1.dia = h1.dia
   group by H1.estacion, H2.estacion , H1.year, H1.mes order by H1.year, H1.mes 
  `;
  console.log(q);
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    console.log('#CLIMA GET data AVG requested');
    response.status(200).json(results.rows);
  })
 }


 const getdataAVG3 = (request, response) => {
  const yyyy1 = request.query.yyyy1;
  const yyyy2 = request.query.yyyy2;
  //const mm1 = request.query.mm1;
  //const mm2 = request.query.mm2;
  const estacion = request.query.estacion;
  const estacion2 = request.query.estacion2;
  var q = `
  select * 
  from promedios_estaciones 
  where estacion in ('${estacion}','${estacion2}') 
  and year between ${yyyy1} and ${yyyy2}
  order by year,mes
  `;
  console.log(q);
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    console.log('#CLIMA GET data AVG requested');
    response.status(200).json(results.rows);
  })
 }



 const proyeccionAbsolutaAgua = (request, response) => {
  const estacion = request.query.estacion;
  var q = `  select * from proyeccion_absoluta_lluvia where estacion = '${estacion}' order by estacion, anio, mes  `;
  
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
  })
 }


 const proyeccionPorcentualAgua = (request, response) => {
  const estacion = request.query.estacion;
  var q = `select * from proyeccion_Porcentual_lluvia  where estacion = '${estacion}'  order by estacion, anio, mes ` ;
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
  })
 }


 const proyeccionAbsolutaTemperatura = (request, response) => {
  const estacion = request.query.estacion;
  var q = `select * from proyeccion_absoluta_temperatura  where estacion = '${estacion}' order by estacion, anio, mes `;
  
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
  })
 }


 const proyeccionPorcentualTemperatura = (request, response) => {
  const estacion = request.query.estacion;
  var q = `select * from proyeccion_Porcentual_temperatura  where estacion = '${estacion}' order by estacion, anio, mes ` ;
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
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

  getyears,
  getdata,
  getdata2,
  getdata3,
  getdataAVG,
  getdataAVG2,
  getdataAVG3,
  proyeccionAbsolutaAgua,
  proyeccionPorcentualAgua,
  proyeccionAbsolutaTemperatura,
  proyeccionPorcentualTemperatura	
  }
  
