var _datosUsuario;

function guardarModulo() {
    var url = "/administrar/GuardarModulo";
    var tipo = 'POST';
    var datos = {
        nombre: $("#nombre").val(),
        descripcion: $("#descripcion").val(),
        precio: $("#precio").val(),
        estado: true,
        tipo: 1,
        medida: $("#medida").val(),
        cantpersonas: $("#cantpersonas").val(),
        cantpuertas: $("#cantpuertas").val(),
        cantventanas: $("#cantventanas").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) {
        getResultadoExitoso(response);
    }, datos, tipoDatos, tipo);
    //go to main page
    //window.location.href = "/signin";
}
function guardarTanque() {
    var url = "/administrar/GuardarTanque";
    var tipo = 'POST';
    var datos = {
        nombre: $("#nombre").val(),
        descripcion: $("#descripcion").val(),
        precio: $("#precio").val(),
        estado: true,
        tipo: 2,
        capacidadlitros: $("#capacidadlitros").val(),
        diametro: $("#diametro").val(),
        volumen: $("#volumen").val(),
        espesor: $("#espesor").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) {
        getResultadoExitoso(response);
    }, datos, tipoDatos, tipo);

    /*if (datos.nombre != "") {
        console.log("guardado");
        toastr.success("Tu cuenta ha sido creada con éxito");
    } else {
        toastr.error(respuesta.Mensaje);
    }*/

    console.log(datos);
    //go to main page
    //window.location.href = "/signin";
}
function limpiarTanque() {
    $("#nombre").val("");
    $("#descripcion").val("");
    $("#precio").val("");
    $("#capacidadlitros").val("");
    $("#diametro").val("");
    $("#volumen").val("");
    $("#espesor").val("");
}
function limpiarModulo() {
    $("#nombre").val("");
    $("#descripcion").val("");
    $("#precio").val("");
    $("#medida").val("");
    $("#cantpersonas").val("");
    $("#cantpuertas").val("");
    $("#cantventanas").val("");

}

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
        toastr.success("Producto guardado con éxito");
    } else {
        toastr.error("Ups.. algo salió mal");
    }
}

function init() {
    $("#productoModulo").prop("checked", true);
    $("#showCapacidadLitros").hide();
    $("#showDiametro").hide();
    $("#showVolumen").hide();
    $("#showEspesor").hide();
    $("#productoModulo").click(function () {
        $("#productoTanque").prop("checked", false);

        $("#showMedida").show();
        $("#showCantidadPersonas").show();
        $("#showCantidadPuertas").show();
        $("#showCantidadVentanas").show();
        $("#showCapacidadLitros").hide();
        $("#showDiametro").hide();
        $("#showVolumen").hide();
        $("#showEspesor").hide();
        console.log("modulo se apreto");

    }
    );
    $("#productoTanque").click(function () {
        $("#productoModulo").prop("checked", false);

        $("#showMedida").hide();
        $("#showCantidadPersonas").hide();
        $("#showCantidadPuertas").hide();
        $("#showCantidadVentanas").hide();
        $("#showCapacidadLitros").show();
        $("#showDiametro").show();
        $("#showVolumen").show();
        $("#showEspesor").show();
        console.log("tanque se apreto");
    }
    );
}

function isTanqueOrModulo() {
    if ($("#productoModulo").prop("checked")) {
        guardarModulo(0);
        limpiarModulo();
    } else {
        guardarTanque(0);
        limpiarTanque();

    }
}

$(document).ready(function () {
    init();
    $("#btnAgregarProducto").click(function () {
        isTanqueOrModulo(0);
    });

});
