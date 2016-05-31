var response = [{
		id: 0,
		type: 'hash-md5,
		data: {
				input: 'woot',
				output: null
		}
}];
var express = require('express');
var app = express();
app.get('/api/Task:id', (req, res) => {
		app.send(JSON.stringify(response));
});

var data = {
		typer: 'hash-md5',
		data: { 
				input: 'woot'
		}
};
var express = require('express');
var app = express();
app.post('/api/Task', (rep, res) => {
		app.send(JSON.stingify(data));
});


