
exports.admin_recibo_register = function(req, res){
	var params = {
		title: "Registro de venta"
		,session: req.session
		,q: req.query
	};
	// if(req.session.id_user == undefined)
	// 	res.redirect('/');
	res.render('admin/recibo_register', params);
}
exports.admin_publish = function(req, res){
	var params = {
		title: "Publicación"
		,session: req.session
	};
	if(req.session.id_user == undefined)
		res.redirect('/');
	res.render('admin/publish', params);
}
exports.admin_patientRecord = function(req, res){
	var params = {
		title: "Expediente del Paciente"
		,idp: req.query.idp!=undefined?req.query.idp:0
		,session: req.session
	};
	if(req.session.id_user == undefined)
		res.redirect('/');
	res.render('admin/patientRecord', params);
}
exports.admin_mypatients = function(req, res){
	var params = {
		title: "Nueva Receta"
		,session: req.session
	};
	if(req.session.id_user == undefined)
		res.redirect('/');
	res.render('admin/mypatients', params);
}
exports.admin_newrecipe = function(req, res){
	var params = {
		title: "Nueva Receta"
		,idp: req.query.idp!=undefined?req.query.idp:0
		,idr: req.query.idr!=undefined?req.query.idr:0
		,fullname: req.query.fullname!=undefined?req.query.fullname:''
		,session: req.session
	};
	if(req.session.id_user == undefined)
		res.redirect('/');
	res.render('admin/newrecipe', params);
}

exports.admin_registerp = function(req, res){
	// console.log(req.query.edit);
	var params = {
		title: "Registro de Paciente"
		,idp: req.query.idp!=undefined?req.query.idp:0
		,edit: req.query.edit==""?true:false
		,session: req.session
	};
	if(req.session.id_user == undefined)
		res.redirect('/');
	res.render('admin/registerp', params);
}


exports.admin = function(req, res){
	var params = {
		title: "Admin"
		,session: req.session
	};
	// console.log(req.session.id_user);
	if(req.session.id_user == undefined)
		res.redirect('/');
	
	//test access fast
	// res.redirect('admin_recibo_register');

	res.render('admin/index', params);
}

exports.index = function(req, res){
	var params = {
		title: "Principal"
	};
	// res.redirect('admin_recibo_register');

	res.render('index', params);
}
// exports.login = function(req, res){
// 	var params = {
// 		title: "Aces"
// 	};
// 	var user_name = req.query.user_name;
// 	var password = req.query.password;
// 	if(user_name && password)
// 		console.log("params");
// 	else
// 		console.log("No params");
	
// 	res.render('login', params);
// }
exports.contact = function(req, res){
	var params = {
		title: "Contactanos"
	};
	res.render('contact', params);
}