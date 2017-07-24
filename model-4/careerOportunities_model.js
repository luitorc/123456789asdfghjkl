var lt = require('../helper/luitor_helper.js');

db = lt.connection("pg");
db.on('error', function (err, client) { console.error('idle client error', err.message, err.stack) });

exports.copor_post = function(req, res, next){
	var obj = req.body;
	// res.send("Hola mundo"+req.body.param1);
	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);
		
		// client.query(`SELECT * FROM corretaje_virtual.curriculumv`, function(err, result) {
		client.query(`SELECT * FROM corretaje_virtual.curriculumv`, function(err, result) {
			//call `done()` to release the client back to the pool 
			done();

			if(err) return console.error('error running query', err);
			
			// console.log(result.rows);
			// lt.return(result.rows, res, next);
			res.send(result.rows);
		});

	});
}