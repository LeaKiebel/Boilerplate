
var express = require('express');
var app     = express();
var router  = express.Router();
var cors 		= require('cors');
var bodyparser = require('body-parser');

router.use(cors());// enable cross origin http-reguest
router.use(bodyparser.json()); // enable body
router.use(bodyparser.urlencoded({extended:true}));

var ROUTES  = [ 'welcome','bots'];

if (ROUTES.length > 0) {

	ROUTES.forEach(function(route) {
		require(__dirname + '/routes/' + route)(router);// IIEF the function is local in welcom.js, aufruf von function
	});

}


app.use('/api', router); // router wird innerhalb von api benutzt




module.exports = {// wird von bin/serve aufgerufen

	listen: function(port) {

		port = typeof port === 'number' ? (port | 0) : null;


		if (port !== null) {

			app.listen(port);

			return true;

		} else {

			throw "listen(Number port): port is not a Number";

		}


		return false;

	}

};
