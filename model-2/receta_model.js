var lt = require('../helper/luitor_helper.js');

db = lt.connection("pg");
db.on('error', function (err, client) { console.error('idle client error', err.message, err.stack) });

exports.delete = function(req, res, next){
	var body = req.body;
	console.log(body);
	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);
		var sql = `DELETE FROM receta WHERE id_receta='${body.idr}'`;
			// console.log(sql);
			client.query(sql, function(err, result) {

				done();

				if(err){
					res.send(false); //devolver 0 or false for find error
					return console.error('error running query', err);
				}
				res.send(result);
			});

	});
}
exports.getlistXpatient = function(req, res, next){
	var body = req.body;

	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);
		var sql = `SELECT * FROM receta WHERE id_paciente = '${body.id_paciente}' ORDER BY id_receta DESC`;
// var sql = `SELECT * FROM receta AS rec 
// INNER JOIN paciente AS pac ON rec.id_paciente = pac.id_paciente
// WHERE pac.id_paciente = '${body.id_paciente}'`;
			client.query(sql, function(err, result) {

				done();

				if(err){
					res.send(false); //devolver 0 or false for find error
					return console.error('error running query', err);
				}
				res.send(result.rows);
			});

	});
}
exports.get = function(req, res, next){
	var body = req.body;

	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);
		var sql = `SELECT * FROM receta WHERE id_receta='${body.idr}'`;

			client.query(sql, function(err, result) {

				done();

				if(err){
					res.send(false); //devolver 0 or false for find error
					return console.error('error running query', err);
				}
				res.send(result.rows);
			});

	});
}
exports.register = function(req, res, next){
	// var obj = req.body;
	var body = req.body;
	//exceptions
	body.yearold = (body.yearold==""?0:body.yearold);
	
	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);
		var sql;
		if(body.id_receta != 0){
			sql = `UPDATE receta
				   SET esf_od='${body.esf_od}', esf_oi='${body.esf_oi}', cil_od='${body.cil_od}', cil_oi='${body.cil_oi}', eje_od='${body.eje_od}', 
				       eje_oi='${body.eje_oi}', add='${body.add}', 
				       dip1='${body.dip1}', dip2='${body.dip2}', edad='${body.edad}', recomendaciones='${body.recomendaciones}', producto='${body.producto}', precio='${body.precio}', 
				       timestamp_aux='${body.timestamp_aux}', id_paciente='${body.id_paciente}', fullname='${body.fullname}', optica='${body.optica}'
				 WHERE id_receta='${body.id_receta}';`;	
		}else{
			sql = `INSERT INTO receta(esf_od, esf_oi, cil_od, cil_oi, eje_od, eje_oi, add, dip1, dip2, edad, recomendaciones, 
	            producto, precio, timestamp_aux, id_paciente,fullname,optica)
	   		 VALUES ('${body.esf_od}', '${body.esf_oi}', '${body.cil_od}', '${body.cil_oi}', '${body.eje_od}', '${body.eje_oi}'
	           , '${body.add}', '${body.dip1}', '${body.dip2}', '${body.edad}', '${body.recomendaciones}', 
	            '${body.producto}', '${body.precio}', '${body.timestamp_aux}', '${body.id_paciente}','${body.fullname}','${body.optica}') RETURNING id_receta;
			`;
		}
		console.log(sql);
			client.query(sql, function(err, result) {

				done();

				if(err){
					res.send(false); //devolver 0 or false for find error
					return console.error('error running query', err);
				}
				if(body.id_receta != 0)
					res.send(result);
				else
					res.send(result.rows[0].id_receta);
			});

	});
}
// exports.getlist = function(req, res, next){

// 	db.connect(function(err, client, done) {
// 		if(err) return console.error('error fetching client from pool', err);
// 		var sql = `SELECT id_paciente, fullname FROM paciente`;

// 			client.query(sql, function(err, result) {

// 				done();

// 				if(err){
// 					res.send(false); //devolver 0 or false for find error
// 					return console.error('error running query', err);
// 				}
// 				res.send(result.rows);
// 			});

// 	});
// }