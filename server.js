(function() {
    // process.env.TZ = "America/New_York";
    var express = require('express'),
        http = require('http');
    var bodyParser = require('body-parser');
    var lt = require('./helper/luitor_helper.js');
    var route = require('./routes');

    // express setup
    var app = express();
    //Set template engine ejs-mate
    var engine = require('ejs-mate');
    app.engine('html', engine);



    var PORT = process.env.PORT || 3500;

    // Configuration
    app.configure(function () {
        // app.set('port', process.env.PORT || 4000);
        // app.set('port', process.env.PORT || 3012);
        app.set('view engine', 'html');
        app.set('view options', { layout: false });
        app.set('views', __dirname + '/views');

        app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
        // app.use(bodyParser.json({limit: '28byte'})); // support json encoded bodies
        app.use(bodyParser.urlencoded({ extended: true ,limit: '50mb'})); // support encoded bodies
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser('token'));
        app.use(express.session({ secret: 'secret' }));
        app.use(express.favicon());
        app.use(express.static(__dirname + '/public'));
    });

    app.configure('development', function () {
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
        app.set('view cache', false);
    });

    app.configure('production', function () {
        app.use(express.errorHandler());
        app.set('view cache', true);
    });

    /*Public*/
    //PUBLISH
    app.get('/', route.index);
        app.post('/publish_get', lt.model('publish').get);
        app.post('/publish_register', lt.model('publish').register);

    //ACCESO
    app.get('/login', route.login);
        app.post('/user_logear', lt.controller('user').logear);
    //CONTACTO
    app.get('/contact',route.contact);

    /*Admin - PACIENTE-INI*/
    app.get('/admin', route.admin);
    // REGISTER
    app.get('/admin_registerp', route.admin_registerp);
        app.post('/paciente_register', lt.model('paciente').register);
        app.post('/paciente_verifyXfullname', lt.model('paciente').verifyXfullname);
    // NEW RECIPE
    app.get('/admin_newrecipe', route.admin_newrecipe);
        app.post('/receta_register', lt.model('receta').register);
        app.post('/receta_get', lt.model('receta').get);
        app.post('/receta_getlistXpatient', lt.model('receta').getlistXpatient);
    // VIEWER
    app.get('/admin_mypatients', route.admin_mypatients);
        app.post('/paciente_getlist', lt.model('paciente').getlist);
        app.post('/paciente_get', lt.model('paciente').get);
        app.post('/paciente_delete', lt.model('paciente').delete);
        app.post('/receta_delete', lt.model('receta').delete);
    // PATIENT RECORD
    app.get('/admin_patientRecord', route.admin_patientRecord);

    /*Admin - PACIENTE-FIN*/

    http.createServer(app).listen(PORT, function () {
        console.log("Express server listening on port " + PORT);
    });
}).call(this);