var lt = require('../helper/luitor_helper.js');

db = lt.connection("pg");
db.on('error', function (err, client) { console.error('idle client error', err.message, err.stack) });

exports.verify = function(req, res, next){
	var body = req.body;
	// console.log(req.body);
	db.connect(function(err, client, done) {

		if(err) return console.error('error fetching client from pool', err);
		var sql = `SELECT * FROM "user" 
					WHERE (user_name = '${body.user_name}' OR correo='${body.user_name}') 
					AND "password" = '${body.password}'
				`;
			client.query(sql, function(err, result) { done();

				if(err){
					res.send(false); //devolver 0 or false for find error
					return console.error('error running query', err);
				}
				if(body.controller)
					res(result.rows);
			});

	});
}