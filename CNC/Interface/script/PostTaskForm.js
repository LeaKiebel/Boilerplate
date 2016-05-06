var processTaskForm = function(){

	var xhr    = new XMLHttpRequest();
	var select = document.getElementById('selectTasks');
	var input = document.getElementById('inputTasks');
  var value = select.options[select.selectedIndex].value;

	var data = {
			type : select.value,

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
