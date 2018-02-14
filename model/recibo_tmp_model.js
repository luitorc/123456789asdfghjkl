var lt = require('../helper/luitor_helper.js');

db = lt.connection("pg");
db.on('error', function (err, client) { console.error('idle client error', err.message, err.stack) });


exports.getAllVentasListXpaciente = function(req, res, next){
	var body = req.body;
	var sql = `SELECT id_recibo_tmp,re_fecha_entrega,re_hora_entrega,re_nro_recibo,re_telefono,re_total,re_acuenta,re_saldo FROM recibo_tmp WHERE id_paciente='${body.id_paciente}'`;


	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);

		client.query(sql, function(err, result) { done();

			if(err)
				return console.error('error running query', err);
			
			res.send(result.rows);
		});

	});
}

exports.getReciboComplete = function(req, res, next, callback = false){
	var body = req.body;
/*	var sql =`SELECT * FROM recibo_tmp as ret 
			INNER JOIN paciente AS pac ON ret.id_paciente = pac.id_paciente
			WHERE ret.id_recibo_tmp='${body.id_recibo_tmp}' `;
*/	
	var sql =`SELECT * FROM recibo_tmp as ret WHERE ret.id_recibo_tmp='${body.id_recibo_tmp}' `;
	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);

		client.query(sql, function(err, result1) { done();

			if(err)
				return console.error('error running query', err);
			if(result1.rows.length < 1){
				res.send(undefined);
				return;
			}
			var sql2 = `SELECT * FROM producto_tmp WHERE id_recibo_tmp='${body.id_recibo_tmp}'`;
			client.query(sql2, function(err, result2) { done();

				if(err)
					return console.error('error running query', err);

				res.send({
					recibo_tmp: result1.rows
					,producto_tmp: result2.rows
				});
			});
		});


	});
}
exports.producto_tmp_register = function(obj, res, next, callback = false){
		var sql = "";
		
		pro_tmp = obj.producto_tmp_arr;
		for( i in pro_tmp ){
			if(obj.update==0){
				sql+=`INSERT INTO producto_tmp(
				            pr_description, pr_subtotal, id_recibo_tmp)
				    VALUES ('${pro_tmp[i].pr_description}', '${pro_tmp[i].pr_subtotal}', 
				            '${obj.id_recibo_tmp}') RETURNING id_producto_tmp;`;
			}else{
					//Aqui la actualizacion
				sql+=`UPDATE producto_tmp SET 
						pr_description='${pro_tmp[i].pr_description}'
						,pr_subtotal='${pro_tmp[i].pr_subtotal}'
						WHERE id_producto_tmp='${pro_tmp[i].id_producto_tmp}';
					`;
			}
		}
		console.log(sql);

	db.connect(function(err, client, done) {
		if(err) return console.error('error fetching client from pool', err);

		client.query(sql, function(err, result) { done();

			if(err)
				return console.error('error running query', err);
			
			if(callback)
				callback(result.rows);
			else
				res.send(result.rows);
		});

	});
}
exports.recibo_tmp_register = function(req, res, next, callback = false){
	var body = req.body; 
	// var sess = req.session; 
	// console.log(callback);

	body.id_paciente = 28;
	db.connect(function(err, client, done) {
		var sql;
		if(body.id_recibo_tmp == 0){
			sql = `INSERT INTO recibo_tmp(
			            re_nro_recibo, re_paciente_name, 
			            re_telefono, re_codigo, re_direccion, re_fecha_entrega, re_hora_entrega, 
			            re_total, re_acuenta, re_saldo,id_paciente)
			    VALUES ('${body.re_nro_recibo}', '${body.re_paciente_name}', 
			            '${body.re_telefono}', '${body.re_codigo}', '${body.re_direccion}', '${body.re_fecha_entrega}', '${body.re_hora_entrega}', 
			            '${body.re_total}', '${body.re_acuenta}', '${body.re_saldo}','${body.id_paciente}') RETURNING id_recibo_tmp`;
	    }else{
	    	//update
	    	sql = `UPDATE recibo_tmp SET 
				    	re_nro_recibo = '${body.re_nro_recibo}'
						,re_paciente_name = '${body.re_paciente_name}'
						,re_telefono = '${body.re_telefono}'
						,re_codigo = '${body.re_codigo}'
						,re_direccion = '${body.re_direccion}'
						,re_fecha_entrega = '${body.re_fecha_entrega}'
						,re_hora_entrega = '${body.re_hora_entrega}'
						,re_total = '${body.re_total}'
						,re_acuenta = '${body.re_acuenta}'
						,re_saldo = '${body.re_saldo}'
					WHERE id_recibo_tmp = '${body.id_recibo_tmp}'
					`
	    }
		if(err) return console.error('error fetching client from pool', err);
			client.query(sql, function(err, result) { done();

				if(err){
					res.send(false); //devolver 0 or false for find error
					return console.error('error running query', err);
				}
				if(callback)
					callback(result.rows);
				else
					res.send(result.rows);
			});

	});
}