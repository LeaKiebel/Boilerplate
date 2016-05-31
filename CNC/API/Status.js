var response = [{
		id: 0,
		ip: '127.0.0.1',
		task: 1,
		workload: 0.0
}];

var express = require('express');
var app = express();
app.get('/api/Status', (req, res) => {
		res.send(JSON.stringify(response));
});

//var button = document.getElementById(button_id);
//var id = parseInt(button_id);
var data = {
		id: O,
		status: true
};	
var express = require('express');
var app = express();
app.post('/api/Status:id', (req, res) => {
		res.send(JSON.stringify(data);
});

// Ich habe mal einfach was ausprobiert. Ich weiß nicht ob es so stimmt. Ich habe mir überlegt, dass man bei response bei id... einmal ein xmlHttpRequest machen müsste, dass man diese Infos vom Server bekommt. Weis aber nicht ob der Denkansatz stimmt. Und mit der Abfrage ob die id einen Wert hat und so habe ich nocht nicht. Und bei der message weiß ich nicht wie ich das umsetzen soll, oder eher welche id. 

	

