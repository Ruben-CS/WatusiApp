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
function moverseA(seccionFormulario) {
    location.hash = "#" + seccionFormulario;
}

//PARA MODIFICAR MODULO
function consumeModificarModulo(id) {
    var url = "/administrar/ModificarModulo";
    var tipo = 'POST';
    var datos = {
        idproducto: id,
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
    location.reload();
}

//PARA MODIFICAR TANQUE
function consumeModificarEndpoint(id) {
    var url = "/administrar/ModificarTanque";
    var tipo = 'POST';
    var datos = {
        idproducto: id,
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
    location.reload();
}

//CONDICIONALES PARA VER QUE ENDPOINT SE VA A CONSUMIR (MODULO O TANQUE)
function editProduct(id) {
    _datosProductos.Data.forEach(function (item) {
        if (item.idproducto == id) {
            moverseA("seccionFormulario");
            $("#nombre").val(item.nombre);
            $("#descripcion").val(item.descripcion);
            $("#precio").val(item.precio);
            $("#productoModulo").hide();
            $("#labelProductoModulo").hide();
            $("#productoTanque").hide();
            $("#labelProductoTanque").hide();
            //TIPO 2 ES SI ES TANQUE
            if (item.tipo == 2) {
                $.ajax({
                    url: "/administrar/ObtenerTanques",
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (data) {
                        _datosProductos = data;
                        $.each(data.Data, function (i, item) {
                            if (item.idproducto == id) {
                                soyUnTanque();
                                //MOSTRAR BOTON EDITAR
                                $("#btnModificarTanque").show();
                                //OCULTAR BOTON AGREGAR NUEVO PRODUCTO
                                $("#btnGuardarTanque").hide();

                                $("#labeltipoProducto").hide();
                                //MOSTRAR LOS CAMPOS DE TANQUE

                                //ASIGNAR VALORES A LOS CAMPOS DE TANQUE
                                $("#capacidadlitros").val(item.capacidadlitros);
                                $("#diametro").val(item.diametro);
                                $("#volumen").val(item.volumen);
                                $("#espesor").val(item.espesor);
                                //OCULTAR CHECKBOX DE MODULO

                                //PONER EN VACIO LOS CAMPOS DEL MODULO

                                //DESHABILITAR BOTON DE AGREGAR NUEVO PRODUCTO
                                $("#btnAgregarProducto").prop("disabled", true);
                                $("#btnAgregarProducto").hide();
                                //CONSUMIR ENDPOINT PARA EDITAR TANQUE
                                $("#btnModificarTanque").click(function () {
                                    consumeModificarEndpoint(id);
                                });
                            }
                        });
                    },
                });
            } else {
                console.log("entre al if del modulo");
                $.ajax({
                    url: "/administrar/ObtenerModulos",
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (data) {
                        _datosProductos = data;
                        $.each(data.Data, function (i, item) {
                            if (item.idproducto == id) {
                                //MOSTRAR LOS INPUTS DE MODULO
                                soyUnModulo();
                                console.log("entre al if del modulo y soy tipo : " + item.tipo);
                                //MOSTRAR BOTON EDITAR MODULO Y OCULTAR MODIFICAR TANQUE
                                $("#btnModificarModulo").show();
                                $("#btnModificarTanque").hide();
                                //OCULTAR EL LABEL DE PREGUNTA
                                $("#labeltipoProducto").hide();
                                //OCULTAR LABEL DEL CHECKBOX DE TANQUE

                                //OCULTAR BOTON AGREGAR NUEVO PRODUCTO
                                $("#btnAgregarProducto").hide();

                                //MOSTRAR LOS CAMPOS DE MODULO

                                //ASIGNAR VALORES A LOS CAMPOS DE MODULO
                                $("#medida").val(item.medida);
                                $("#cantpersonas").val(item.cantpersonas);
                                $("#cantpuertas").val(item.cantpuertas);
                                $("#cantventanas").val(item.cantventanas);

                                //OCULTAR CHECKBOX DE TANQUE
                                $("#productoTanque").hide();

                                //CONSUMIR ENDPOINT PARA EDITAR TANQUE
                                $("#btnModificarModulo").click(function () {
                                    consumeModificarModulo(id);
                                });
                            }
                        });
                    },
                });

            }
        }
    });
    //location.reload();
}
function changeStatus(id) {
    console.log(_datosProductos);
    _datosProductos.Data.forEach(function (item) {
        if (item.idproducto == id) {
            var url = "/administrar/DeshabilitarProducto";
            var tipo = 'POST';
            var datos = {
                idproducto: item.idproducto,
                estado: !item.estado,
            };
            var tipoDatos = 'JSON';
            solicitudAjax(url, function (response) {
                //getResultadoExitoso(response);
            }, datos, tipoDatos, tipo);
            console.log(_datosProductos);
            //cambiar el color del boton
            if (item.estado == true) {
                //$("#btnCambiarEstado").removeClass('text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900');
                //$("#btn" + id).addClass("btn-danger");
                //$("#btn" + id).text("Deshabilitar");
            } else {
                //$("#btn" + id).removeClass("btn-danger");
                //$("#btn" + id).addClass("btn-success");
                //$("#btn" + id).text("Habilitar");
            }
            //reload the page
            location.reload();
        }
    });
}
function deleteProduct(id) {
    var url = "/administrar/EliminarProducto";
    var tipo = 'POST';
    var datos = {
        idproducto: id,
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) {
        getResultadoExitoso(response);
    }, datos, tipoDatos, tipo);
    //console.log(datos);
    location.reload();
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
        toastr.success("Consulta exitosa", "Éxito");
        _datosProductos = resultado.Data;
        //console.log(resultado);
        //mostrarProductos();
    } else {
        toastr.error("Ups.. algo salió mal");
    }
}

function getAllProducts() {
    $.ajax({
        url: "/administrar/ObtenerProductos",
        type: 'GET',
        //datos: {},
        dataType: 'JSON',
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

                    "<td class=' py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>" +
                    "<button id='btnCambiarEstado' class='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800' onclick='changeStatus(" + item.idproducto + ")'>Cambiar estado</button>" +
                    "</p></div></td>" +

                    "<td class=' py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>" +
                    "<button id='btnEliminar' class='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900' onclick='deleteProduct(" + item.idproducto + ")'>Eliminar</button>" +
                    "</p></div></td>" +

                    "<td class=' py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>" +
                    "<button href='#seccionFormulario' id='btnEditar' class='text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900' onclick='editProduct(" + item.idproducto + ")'>Editar</button>" +
                    "</p></div></td>" +

                    "</tr>";
                /*if (item.estado != true) {
                    $("#btnCambiarEstado").removeClass('text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900');
                }
                else {
                    $("#btnCambiarEstado").removeClass('text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900');
                }*/

                //$("#tblProductos").append(row);

                _datosProductos = data;
                $("#tblProducto>tbody").append(row);
                //console.log(_datosProductos.Data.nombre);
            });
            console.log(_datosProductos);
        }
    });
}

//function to change the state of the product

function soyUnModulo() {
    $("#productoTanque").prop("checked", false);
    $("#productoModulo").prop("checked", true);
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
function soyUnTanque() {
    $("#productoModulo").prop("checked", false);
    $("#productoTanque").prop("checked", true);
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

function init() {

    getAllProducts();

    //OCULTAR BOTONES DE EDITAR
    $("#btnModificarTanque").hide();
    $("#btnModificarModulo").hide();
    //OCULTAR TODOS LOS CAMPOS DE TANQUE Y MODULO AL CARGAR LA PAGINA
    $("#showCapacidadLitros").hide();
    $("#showDiametro").hide();
    $("#showVolumen").hide();
    $("#showEspesor").hide();
    $("#showMedida").hide();
    $("#showCantidadPersonas").hide();
    $("#showCantidadPuertas").hide();
    $("#showCantidadVentanas").hide();
    $("#productoModulo").click(function () {
        soyUnModulo();
    });
    $("#productoTanque").click(function () {
        soyUnTanque();
    });
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

//btnMostrarBotonAgregar

$(document).ready(function () {
    init();
    $("#btnAgregarProducto").click(function () {
        isTanqueOrModulo(0);
    });

});
