var _datosUsuario;
function guardarUsuario(iduser) {
    var url = "/register/GuardarUsuario";
    var tipo = 'POST';
    var datos = {
        iduser: iduser,
        name: $("#name").val(),
        password: $("#password").val(),
        rol: "C",
        telefono: $("#telefono").val(),
        email: $("#email").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) {
        getResultadoExitoso(response);
    }, datos, tipoDatos, tipo);
    //go to main page
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
function getResultadoExitoso(resultado) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "2000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    if (resultado.Success) {
        toastr.success("Cuenta añadida con éxito");
        window.location.href = "/signin";
    } else {
        toastr.error("Ups.. algo salió mal");
    }
}

$(document).ready(function () {
    $("#btnGuardar").click(function () {
        guardarUsuario();
        limpiar();
        //getUsuarioExitoso();
    });
});
