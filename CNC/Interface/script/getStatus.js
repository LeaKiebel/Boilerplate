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
				code += '<td><button class="button" id="button_id' + entry.id +'" onclick="toggleButton(this.id);">Start</button></td>';
				code += '</tr>';

			}

			content.innerHTML = code;

		} else {
			content.innerHTML = 'Failed to load :(';

		}

	};

	xhr.send(null);
};
// var toggleButton = function(button_id) {
//
// 	var idInt = parseInt(button_id[9],10);
// 	// // zu verschickendes Objekt
// 	// var data = {
// 	// 	id: idInt,
// 	// 	status: true
// 	// };
//
// 	// prüft toggleButton Start oder Stop
//  if(document.getElementById(button_id).=="Start") {
//  	document.getElementById(button_id).value="Stop";
//
//  } else if(document.getElementById(button_id).value=="Stop") {
//    document.getElementById(button_id).value="Start";
//   data.status = false;
//  }
//
//  		var xhr = new XMLHttpRequest();
//  		xhr.open('POST',"http://botnet.artificial.engineering:8080/api/Status/" + idInt);
// 		xhr.setRequestHeader('token','b08494e1db6dc606baa613fbf2a05393');
// 		xhr.
// 		// JSON.stringify(data);
// 		xhr.send(null);
//
// };
