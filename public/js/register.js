var _datosUsuario;

/*function guardarUsuarioExitoso(respuesta, elemento) {
    if (respuesta.Success) {
        if (elemento) {
            elemento.name = $("#name").val();
            elemento.password = $("#password").val();
        } else {
            var user = {
                iduser: parseInt(respuesta.Data),
                name: $("#name").val(),
                password: $("#password").val(),
            };
            console.log(user);
            _datosUsuario.push(user);
        }
        //mostrarDatosTipos();
        toastr.success("Tu cuenta ha sido creada con éxito");
    } else {
        toastr.error(respuesta.Mensaje);
    }
}*/
function guardarUsuario(iduser, elemento) {
    var url = "/register/GuardarUsuario";
    var tipo = 'POST';
    var datos = {
        iduser: iduser,
        name: $("#name").val(),
        password: $("#password").val(),
        rol: $("#rol").val(),
        telefono: $("#telefono").val(),
        email: $("#email").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) {
        //getUsuarioExitoso(response, elemento);
    }, datos, tipoDatos, tipo);
    //go to main page
    window.location.href = "/signin";
}

function limpiar() {
    $("#name").val("");
    $("#password").val("");
    $("#telefono").val("");
    $("#email").val("");
}


/*function getUsuarioExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosUsuario = resultado.Data;
        //mostrarDatosTipos();
    } else {
        toastr.error(resultado.Mensaje);
    }
}*/

/*function init() {
    var url = "/register/GuardarUsuario";
    var tipo = 'POST';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getUsuarioExitoso, datos, tipoDatos, tipo);
}*/


$(document).ready(function () {
    $("#btnGuardar").click(function () {
        guardarUsuario(0);
        limpiar();
        //getUsuarioExitoso();
    });
});
