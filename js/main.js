//----------------- validacion correo y contraseña-------------
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

});

//-----------------guardamos las tarjetas ingreadas en perfil.html-------------

//Aqui guardo los numeros de tarjeta del usuario, guardo en local Storage e imprimo
$(document).ready(function(){
	//Esta seccion imprime el correo electronico guardado en storage
	var correoElec = localStorage.getItem('email'); 
	$("#correo-storage").html(correoElec);

	//Mi variable con el arreglo debe ser global
	var numeros = [];

	$("#btn-agregar").click(function(){
			
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

/* ---------------------ajax y API-saldo.html--------------------- */
$(document).ready(function(){

	//Aqui extraigo el numero de tarjeta del input regular
	$("#btn-saldo").click(function(){
		$(".caja-saldo").remove();
		if($("#input-tarjeta2").val() == ""){
			$("#input-tarjeta2").val("");
			return false;
		} else{
			var numeroTarj = $("#input-tarjeta2").val();
			llamarAjax(numeroTarj);
			$("#input-tarjeta2").val("");
		}
			
	});

	//Aqui manejo el numero de tarjeta del select---------------------

	//Primero creo las opciones del select de manera dinamica trayendo value desde localStorage
	console.log(localStorage.getItem("numTarjeta"));
	var parseJson = JSON.parse(localStorage.getItem("numTarjeta"));
	console.log(parseJson.length);
	console.log(parseJson[0]);
	var cantidadNumeros = parseJson.length;

	if(cantidadNumeros == 1){
		console.log("switch 1");
		$("#select-input").append('<option value="'+parseJson[0]+'">'+parseJson[0]+'</option>');
	} else if (cantidadNumeros == 2){
		console.log("switch 2");
            $("#select-input").append('<option value="'+parseJson[0]+'">'+parseJson[0]+'</option><option value="'+parseJson[1]+'">'+parseJson[1]+'</option>');
	}else if (cantidadNumeros == 3 ){
		console.log("switch 3");
            $("#select-input").append('<option value="'+parseJson[0]+'">'+parseJson[0]+'</option><option value="'+parseJson[1]+'">'+parseJson[1]+'</option><option value="'+parseJson[2]+'">'+parseJson[2]+'</option>');
	} else if (cantidadNumeros == 4 ){
		console.log("switch 4");
            $("#select-input").append('<option value="'+parseJson[0]+'">'+parseJson[0]+'</option><option value="'+parseJson[1]+'">'+parseJson[1]+'</option><option value="'+parseJson[2]+'">'+parseJson[2]+'</option><option value="'+parseJson[3]+'">'+parseJson[3]+'</option>');
	}

	//Desabilito el input cuando se hace seleccion, el div que tenia display none se habilita ya que los elementos que estan disabled no responden a los handlers de eventos
	$("#input-tarjeta2").click(function(event) {
		$("#select-input").val("");
		$("#select-input").prop( "disabled", true );
		$(".select-div-disable").css('display','inherit');
	});

	$(".select-div-disable").click(function() {
		$(this).hide().prev($("#select-input")).prop("disabled", false).focus();
	});

	//parte del select
	$("#select-input").click(function(event) {
		$("#input-tarjetat").prop( "disabled", true );
		$(".input-div-disable").css('display','inherit');
	});

	$(".input-div-disable").click(function() {
		$(this).hide().prev($("#input-tarjeta2")).prop("disabled", false).focus();
	});
	// fin de seccion de habilitar y deshabilitar

	

	//Ahora extraigo el value de la seleccion cuando se hace click
	$("#btn-saldo").click(function() {
		if($("#select-input").val() == ""){
		alert("Escoge una tarjeta");
		} else {
			console.log($("#select-input").val());
			var numeroTarj = $("#select-input").val();
			llamarAjax(numeroTarj);
		}
	});
	
	
	
});

var llamarAjax = function(numeroTarjeta){
	$.ajax({
		url     : 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
        type    : 'GET',
        dataType: 'json',
        data    : {'bip' : numeroTarjeta},
	})
	.done(function(data) {
		console.log(data.saldoTarjeta);
		$("#container-saldo").append('<div class="caja-saldo"><div class="saldo-total">SALDO TOTAL</div>'+
			'<div class="monto">'+data.saldoTarjeta+'</div></div>');
	})
	.fail(function() {
		console.log("error pq ajax se esta disparando dos veces, una en el caso de click cuando se extra del input y otra cuando se extrae del select");
	})
	.always(function() {
		console.log("complete");
	});
}