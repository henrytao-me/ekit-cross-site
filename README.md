ekit-cross-site
===============

## Problem
You may face the problem with Access-Control-Allow-Origin when you want to call API on cross domain. Here is the simple solution for that. 

## Usage

Require ekit-cross-site module before all other API defination and put the list of allow site as below

Note: only use with expressjs

```
...
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  ...
});

require('ekit-cross-site')(app, ['http://127.0.0.1:9000', 'http://0.0.0.0:9000']);
...

```

## How does it look like


```
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
```
