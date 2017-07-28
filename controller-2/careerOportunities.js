// SELECT id_attention, dni, nombres, telefono, fecha FROM attention WHERE last1='t' ORDER BY id_attention DESC
var lt = require('../helper/luitor_helper.js');
var careerOportunities_model = lt.model('careerOportunities');


exports.copor_post = function(req, res, next){
	// var sess = req.session;
	// var obj = lt.getAjax(req,res);
	res.send("Hola mundo"+req.body.param1);
	// console.log(obj);

	// sindibe_model.copor_post(req,function(obj1){
	// 	console.log(obj1);
	// 	if( 'rmt' in obj ){
	// 		res.send(JSON.stringify(obj1));return;
	// 	}
	// 	res.send(obj1);
	// });
	
}