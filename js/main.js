var llamarAjax = function(){
	$.ajax({
		url: '/path/to/file',
		type: 'GET',
		dataType: 'json',
		data: {param1: 'value1'},
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}