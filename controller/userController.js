var lt = require('../helper/luitor_helper.js');
var user_model = lt.model('user');

exports.logear = function(req, res, next){
	req.body.controller=true;

	user_model.verify(req, function(dt){
		// console.log(dt);
		res.send(dt[0]);
	});
}