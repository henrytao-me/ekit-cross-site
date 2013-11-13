// inject express app
var config = {
	allow: ['http://127.0.0.1:9000', 'http://0.0.0.0:9000']
};

module.exports = function(app, allowList) {
	// allow
	config.allow = allowList;
	// allow request
	app.all('/*', function(req, res, next) {
		var isPass = false;
		for (var i in config.allow) {
			if (req.headers.origin === config.allow[i]) {
				isPass = true;
			}
		};
		if (isPass === true) {
			res.header('Access-Control-Allow-Origin', req.headers.origin);
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
		};
		return next();
	});
}