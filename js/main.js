$(document).ready(function(){
	//Seccion de abrir y cerrar sideNav
	$("#burguer").click(function() {
			$("#sidenav").css("width","270px");
		});

		$("#btn-cerrar").click(function() {
			$("#sidenav").css("width","0");
		});

	//Seccion Sign Up obtener Nombre y correo
    $("#padre-btn-iniciar").on("click", $("#btn-iniciar"), function(e) {

        $(".red").remove();

        if(correo()){
            if(contrasena()){
                window.open('menu.html','_self',false);  
            }
        }
    });

    //validación contraseña
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

    llamarAjax("10282608");

});

//-----------------FIN validacion correo y contraseña-------------

var llamarAjax = function(numeroTarjeta){
	$.ajax({
		url     : 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
        type    : 'GET',
        dataType: 'json',
        data    : {'bip' : numeroTarjeta},
	})
	.done(function(data) {
		console.log(data.saldoTarjeta);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}

//Aqui guardo los numeros de tarjeta del usuario, guardo en local Storage e imprimo
$(document).ready(function(){
	//Esta seccion imprime el correo electronico guardado en storage
	var correoElec = localStorage.getItem('email'); 
	$("#correo-storage").html(correoElec);

	//Mi variable con el arreglo debe ser global
	var numeros = [];

	$(".btn-agregar").click(function(){
			
		var tarjetaNum = $("#input-tarjeta").val();
		$("#input-tarjeta").val("");
		
		if(tarjetaNum == ""){
			return false;
		} else{
			//creo un arreglo al cual hago push los numeros ingresados por el usuario, 
			//es este arreglo el que despues guardo en localStorage con stringify
		    numeros.push(tarjetaNum);
		    console.log(numeros);
		    localStorage.setItem("numTarjeta", JSON.stringify(numeros));
		    console.log(localStorage.getItem("numTarjeta"));

		    var numerosGuardados = localStorage.getItem("numTarjeta");
			
		    $("#items").append('<div class="div-numeros">'+tarjetaNum+'</div>');

		}
			
	});
});