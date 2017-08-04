var lt = require('../helper/luitor_helper.js');

db = lt.connection("pg");
db.on('error', function (err, client) { console.error('idle client error', err.message, err.stack) });

exports.verifyXfullname = function(req, res, next){
	var body = req.body;

	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);
		var sql = `SELECT upper(fullname) FROM paciente WHERE upper(fullname) = upper('${body.fullname}')`;
			console.log(sql)
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
exports.delete = function(req, res, next){
	var body = req.body;
	console.log(body);
	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);
		var sql = `DELETE FROM paciente WHERE id_paciente='${body.idp}'`;

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

exports.get = function(req, res, next){

	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);
		var sql = `SELECT * FROM paciente WHERE id_paciente = '${req.body.idp}'`;
			console.log(sql);
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
	var body = req.body;

	body.yearold = (body.yearold==""?0:body.yearold);
	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);

		var sql;
		if(body.id_paciente != 0){
			sql = `UPDATE paciente
			   SET fullname='${body.fullname}'
			   , yearold='${body.yearold}', datetime='${body.datetime}', telephone='${body.telephone}', optica='${body.optica}'
			 WHERE id_paciente= '${body.id_paciente}';
			`;
		
		}else{
			sql = `INSERT INTO paciente(
		            fullname, yearold, datetime, telephone, optica, id_user)
		    	VALUES ('${body.fullname}', ${body.yearold}
		    		, '${body.datetime}', '${body.telephone}', '${body.optica}','${req.session.id_user}') RETURNING id_paciente;
		`;
		}
		
			client.query(sql, function(err, result) {

				done();

				if(err){
					res.send(false); //devolver 0 or false for find error
					return console.error('error running query', err);
				}
				if(body.id_paciente != 0)
					res.send(result);
				else
					res.send(result.rows[0].id_paciente);
			});

	});
}

exports.getlist = function(req, res, next){

	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);
		// var sql = `SELECT id_paciente, fullname, yearold, telephone,datetime FROM paciente`;
		var sql = `SELECT pac.id_paciente,pac.optica, pac.fullname, pac.yearold, pac.telephone,pac.datetime, COUNT(rec.*) as rec_cant FROM paciente as pac
LEFT JOIN receta as rec ON pac.id_paciente = rec.id_paciente GROUP BY pac.id_paciente, pac.fullname, pac.yearold, pac.telephone,pac.datetime`;

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