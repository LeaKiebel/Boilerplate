var initTask = function() {

	var xhr    = new XMLHttpRequest();
	var content = document.querySelector('#tasks>tbody');


	xhr.open('GET', 'http://botnet.artificial.engineering:8080/api/tasks');
	xhr.responseType = 'json';

	xhr.onload = function() {

		var data = xhr.response;
		if (data instanceof Array) {

			var code = '';

			for (var d = 0, dl = data.length; d < dl; d++) {

				var entry = data[d];

				code += '<tr>';
				code += '<td>' + entry.id + '</td>';
				code += '<td>' + entry.type + '</td>';
				code += '<td>' + entry.data.input + '</td>';
				code += '<td>' + entry.data.output + '</td>';
				code += '</tr>';

			}

			content.innerHTML = code;

		} else {
			content.innerHTML = 'Failed to load :(';

		}

	};

	xhr.send(null);

};

var processTaskForm = function(){

	var xhr    = new XMLHttpRequest();
	var select = document.querySelector('#taskForm > select');
	var input = document.querySelector('#taskForm > input');

	var data = {
			type = select.options[select.selectedIndex].value ,

			data : {
				input: input.value
			}
	};

	xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/tasks');
	xhr.responseType = 'json';
	xhr.setRequestHeader('content-type','application/json');
	xhr.setRequestHeader('token','b08494e1db6dc606baa613fbf2a05393');


	xhr.send(JSON.stringify(data));
};
