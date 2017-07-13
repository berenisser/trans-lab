var llamarAjax = function(){
	$.ajax({
		url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=123456',
		type: 'GET',
		dataType: 'json',
		data: {'limit': '2'},
	})
	.done(function(data) {
		console.log(data);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}

llamarAjax();

   //Seccion Sign Up obtener Nombre y correo
$(document).ready(function(){
    $("#padre-btn-iniciar").on("click", $("#btn-iniciar"), function(e) {

        $(".red").remove();

        if(correo()){
            if(contrasena()){
                window.open('menu.html','_self',false);  
            }
        }
    });

    //validación nombre
    function contrasena(){
        var nameValue = $("#contrasena").val();
        console.log(nameValue);
        if (!(/^[0-9]{2,8}$/).test(nameValue)){
            $("#espacio-error-nombre").append('<p class="red">Contraseña debe incluir max 8 números</p>');
            $("#contrasena").val("");
            console.log("second");
            return false;
        }else{
            return true;
        }
    }

    //validacion correo 
    function correo(){
        var emailValue = $("#correo").val();
        console.log(emailValue);
        if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(emailValue)){
            $("#espacio-error-nombre").append('<p class="red">Correo Invalido</p>');
            $("#correo").val("");
            console.log("first");
            return false;
        } else{
            localStorage.setItem('email',emailValue);
            return true;
        }
    }


    $("#burguer").click(function() {
		$("#sidenav").css("width","250px");
	});

	$("#btn-cerrar").click(function() {
		$("#sidenav").css("width","0");
	});
});





