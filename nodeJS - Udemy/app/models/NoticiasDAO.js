function NoticiasDAO(connection) {
	this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function (callback) {
	this._connection.query('SELECT * FROM NOTICIAS ORDER BY data_criacao desc', callback);			
}

NoticiasDAO.prototype.getNoticia = function(id_noticia, callback) {
	this._connection.query('SELECT * FROM NOTICIAS WHERE id_noticia = ' + id_noticia.id_noticia, callback);
}

NoticiasDAO.prototype.salvarNoticia = function(noticia, callback) {
	this._connection.query('INSERT INTO NOTICIAS SET ?', noticia, callback);
}

NoticiasDAO.prototype.get5UltimasNoticias = function(callback) {
	this._connection.query('SELECT * FROM NOTICIAS ORDER BY data_criacao desc limit 5', callback);	
}

module.exports = function() {	
	return NoticiasDAO;
}