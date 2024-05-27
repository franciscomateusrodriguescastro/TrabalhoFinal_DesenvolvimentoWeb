const application = {};
var app = require('./config/server')

//var rotahome = require('./app/routes/home') (app);

//var rotalogin = require('./app/routes/login')(app);

//var rotacadastro = require('./app/routes/cadastro')(app);

app.listen(27017, function(){
	console.log("Servidor ON");
});