var initStatus = function() {

	var xhr    = new XMLHttpRequest();
	var content = document.querySelector('#status-overview tbody');


	xhr.open('GET', 'http://botnet.artificial.engineering:8080/api/Status');
	xhr.responseType = 'json';
	xhr.setRequestHeader('Token','b08494e1db6dc606baa613fbf2a05393');

	xhr.onload = function() {

		var data = xhr.response;
		if (data instanceof Array) {

			var code = '';

			for (var d = 0, dl = data.length; d < dl; d++) {

				var entry = data[d];

				code += '<tr>';
				code += '<td>' + entry.id + '</td>';
				code += '<td>' + entry.ip + '</td>';
				code += '<td>' + entry.task + '</td>';
				code += '<td>' + entry.workload + '</td>';
				code += '<td><button class="button" id="button_id' + entry.id +'" onclick="toggleButton(this.id);">';
				code += (!entry.workload)?'Start':'Stop';

				code += '</button></td></tr>';

			}

			content.innerHTML = code;

		} else {
			content.innerHTML = 'Failed to load :(';

		}

	};

	xhr.send(null);
};

var toggleButton = function(button_id) {

	var button = document.getElementById(button_id);
	var idInt = parseInt(button_id[9],10);
	var work = button.parentNode.previousSibling;


	var xhr = new XMLHttpRequest();
	xhr.open('POST','http://botnet.artificial.engineering:8080/api/Status/');
	xhr.setRequestHeader('content-type','application/json');
	xhr.setRequestHeader('token','b08494e1db6dc606baa613fbf2a05393');

	// zu verschickendes Objekt
	var data = {
		id: idInt,
		status: true
	};

 if(button.innerHTML=="Start") {
		button.innerHTML="Stop";
		work.innerHTML='1';
	} else {
   button.innerHTML="Start";
	 work.innerHTML='0';
  data.status = false;
 }

 xhr.send(JSON.stringify(data));
};
