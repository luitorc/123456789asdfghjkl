var lt = require('../helper/luitor_helper.js');
var user_model = lt.model('user');

exports.logear = function(req, res, next){
	req.body.controller=true;

	user_model.verify(req, function(dt){
		// console.log(dt);
		if(dt[0]){
			req.session.id_user = dt[0].id_user;
			req.session.user_name = dt[0].user_name;
			req.session.fullname = dt[0].fullname;
			req.session.optica = dt[0].optica;
			console.log(req.session);
		}
		res.send(dt[0]);
	});
}
exports.close_session = function(req, res, next){
	req.session.destroy();
	res.redirect('/');
}