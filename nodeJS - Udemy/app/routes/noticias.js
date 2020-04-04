module.exports = function(application) {

	application.get('/noticias', function(req, res) {
		application.app.controllers.noticias.Noticias(application, req, res);		
	});

	application.get('/noticia', function(req, res) {
		application.app.controllers.noticias.Noticia(application, req, res);						
	});
}	