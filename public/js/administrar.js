var _datosProductos;
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
    //console.log(datos);
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
        _datosProductos = resultado.Data;
        console.log(resultado);
        //mostrarProductos();
    } else {
        toastr.error("Ups.. algo salió mal");
    }
}

function getAllProducts() {
    $.ajax({
        url: "/catalogo/ObtenerProductos",
        type: 'GET',
        //datos: {},
        dataType: 'JSON',
        //_datosProductos: datos,
        success: function (data) {
            _datosProductos = data;
            $.each(data.Data, function (i, item) {
                var row =

                    "<tr>" +
                    "<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>" + item.nombre +
                    "</p></div></td>" +

                    "<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>" + item.descripcion +
                    "</p></div></td>" +

                    "<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>" + item.tipo +
                    "</p></div></td>" +

                    "<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>" + item.precio +
                    "</p></div></td>" +


                    "<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>" + item.estado +
                    "</p></div></td>" +
                    "</tr>";

                $("#tblProducto>tbody").append(row);
                //console.log(_datosProductos.Data.nombre);
            });
            console.log(_datosProductos);
        }
    });
}

function init() {
    getAllProducts();
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

btnMostrarBotonAgregar

$(document).ready(function () {
    init();
    $("#btnAgregarProducto").click(function () {
        isTanqueOrModulo(0);
    });

});
