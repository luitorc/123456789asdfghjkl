var lt = require('../helper/luitor_helper.js');
var recibo_tmp_model = lt.model('recibo_tmp');

exports.registrar_recibo_tmp = function(req, res, next){
	var body = req.body;
	// console.log(body);
	// return;
	recibo_tmp_model.recibo_tmp_register(req, res, next, function(dt){
		// console.log(body);

		var obj_in = {
			update: body.id_recibo_tmp //para ver si esta en modo update desde el cliente; 0: insert, !=0: update
			,producto_tmp_arr: body.producto_tmp_arr
			,id_recibo_tmp: dt.length?dt[0].id_recibo_tmp:''
		}
		console.log(obj_in);
		recibo_tmp_model.producto_tmp_register(obj_in, res, next, function(dt){
			console.log(dt);
			res.send(dt);
		});
	});
}