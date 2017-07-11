var lt = require('../helper/luitor_helper.js');

db = lt.connection("pg");
db.on('error', function (err, client) { console.error('idle client error', err.message, err.stack) });

exports.get = function(req, res, next){
	var body = req.body;

	db.connect(function(err, client, done) {

		if(err) return console.error('error fetching client from pool', err);
		var sql = `SELECT *, to_char(datetime1 , 'DD/MM/YYYY HH12:MI:SS') as "fecha_publish" FROM publish ORDER BY id_publish DESC `;
			client.query(sql, function(err, result) { done();

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

	db.connect(function(err, client, done) {

		if(err) return console.error('error fetching client from pool', err);
		var sql = `
				INSERT INTO publish(
		            titulo, img, descripcion, id_user)
	    	VALUES ('${body.titulo}', '${body.fileName}', '${body.descripcion}', '${req.session.id_user}');
`;			
			console.log(sql);
			client.query(sql, function(err, result) { done();

				if(err){
					res.send(false); //devolver 0 or false for find error
					return console.error('error running query', err);
				}
				res.send(result.rows);
			});

	});
}