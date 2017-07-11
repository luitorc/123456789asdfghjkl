
exports.admin_patientRecord = function(req, res){
	var params = {
		title: "Expediente del Paciente"
		,idp: req.query.idp!=undefined?req.query.idp:0
	};
	res.render('admin/patientRecord', params);
}
exports.admin_mypatients = function(req, res){
	var params = {
		title: "Nueva Receta"
	};
	res.render('admin/mypatients', params);
}
exports.admin_newrecipe = function(req, res){
	var params = {
		title: "Nueva Receta"
		,idp: req.query.idp!=undefined?req.query.idp:0
		,idr: req.query.idr!=undefined?req.query.idr:0
		,fullname: req.query.fullname!=undefined?req.query.fullname:''
	};
	res.render('admin/newrecipe', params);
}

exports.admin_registerp = function(req, res){
	// console.log(req.query.edit);
	var params = {
		title: "Registro de Paciente"
		,idp: req.query.idp!=undefined?req.query.idp:0
		,edit: req.query.edit==""?true:false
	};
	res.render('admin/registerp', params);
}


exports.admin = function(req, res){
	var params = {
		title: "Admin"
	};
	res.render('admin/index', params);
}

exports.index = function(req, res){
	var params = {
		title: "Principal"
	};
	res.render('index', params);
}
exports.login = function(req, res){
	var params = {
		title: "Aces"
	};
	res.render('login', params);
}