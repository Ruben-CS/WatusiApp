let _datosProductos;
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
function moverseVerTanque(seccionFormulario) {
    location.hash = "#" + seccionFormulario;

}
function moverseVerModulo(seccionFormulario) {
    location.hash = "#" + seccionFormulario;
}
function moverseEditarTanque(seccionFormulario) {
    location.hash = "#" + seccionFormulario;

}
function moverseEditarModulo(seccionFormulario) {
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
function consumeModificarTanque(id) {
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

function obtenerDatosTanqueConValidaciones(id) {
    $.ajax({
        url: "/administrar/ObtenerTanques",
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            _datosProductos = data;
            $.each(data.Data, function (i, item) {
                if (item.idproducto == id) {
                    //TRAER LOS INPUTS DE TANQUE
                    soyUnTanque();
                    //MOSTRAR Y OCULTAR BOTONES
                    $("#btnModificarTanque").show();
                    $("#btnGuardarTanque").hide();
                    //ASIGNAR VALORES A LOS CAMPOS DE TANQUE
                    $("#capacidadlitros").val(item.capacidadlitros);
                    $("#diametro").val(item.diametro);
                    $("#volumen").val(item.volumen);
                    $("#espesor").val(item.espesor);
                    //CONSUMIR ENDPOINT PARA EDITAR TANQUE
                    $("#btnModificarTanque").click(function () {
                        consumeModificarTanque(id);
                    });
                }
            });
        },
    });
}

function verDetalleModulo(id) {
    $(".container").show();
    $.ajax({
        url: "/administrar/ObtenerModulos",
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            _datosProductos = data;
            _datosProductos.Data.forEach(function (item) {

                if (item.idproducto == id) {
                    moverseVerModulo("seccionFormulario");
                    $("#nombre").val(item.nombre);
                    $("#descripcion").val(item.descripcion);
                    $("#precio").val(item.precio);
                    $("#medida").val(item.medida);
                    $("#cantpersonas").val(item.cantpersonas);
                    $("#cantpuertas").val(item.cantpuertas);
                    $("#cantventanas").val(item.cantventanas);
                }
            });
            soyUnModulo();
            $("#tituloDetalleProducto").show();
            $("#tituloAgregarNuevoProducto").hide();
            $("#tituloModificarProducto").hide();

            $("#btnGuardarModulo").hide();
            $("#btnModificarModulo").hide();
            $("#btnModificarTanque").hide();
            $("#btnAgregarProducto").hide();
            $("#tituloEditarProducto").hide();
            $("#labeltipoProducto").hide();
            $("#labelProductoModulo").hide();
            $("#labelProductoTanque").hide();
            $("#productoModulo").hide();
            $("#productoTanque").hide();
            $("#subtitleform").hide();
            $("#subtitleformEmpty").show();

            //DISABLE INPUTS
            $("#nombre").prop("disabled", true);
            $("#descripcion").prop("disabled", true);
            $("#precio").prop("disabled", true);
            $("#medida").prop("disabled", true);
            $("#cantpersonas").prop("disabled", true);
            $("#cantpuertas").prop("disabled", true);
            $("#cantventanas").prop("disabled", true);
        },
    });
}
function verDetalleTanque(id) {
    $(".container").show();
    $.ajax({
        url: "/administrar/ObtenerTanques",
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            _datosProductos = data;
            _datosProductos.Data.forEach(function (item) {

                if (item.idproducto == id) {
                    moverseVerTanque("seccionFormulario");
                    $("#nombre").val(item.nombre);
                    $("#descripcion").val(item.descripcion);
                    $("#precio").val(item.precio);
                    $("#capacidadlitros").val(item.capacidadlitros);
                    $("#diametro").val(item.diametro);
                    $("#volumen").val(item.volumen);
                    $("#espesor").val(item.espesor);
                }
            });
            soyUnTanque();
            $("#tituloDetalleProducto").show();
            $("#tituloAgregarNuevoProducto").hide();
            $("#tituloModificarProducto").hide();

            $("#btnGuardarModulo").hide();
            $("#btnModificarModulo").hide();
            $("#btnModificarTanque").hide();
            $("#btnAgregarProducto").hide();

            $("#labeltipoProducto").hide();
            $("#labelProductoModulo").hide();
            $("#labelProductoTanque").hide();
            $("#productoModulo").hide();
            $("#productoTanque").hide();
            $("#subtitleform").hide();
            $("#subtitleformEmpty").show();

            //DISABLE INPUTS
            $("#nombre").prop("disabled", true);
            $("#descripcion").prop("disabled", true);
            $("#precio").prop("disabled", true);
            $("#capacidadlitros").prop("disabled", true);
            $("#diametro").prop("disabled", true);
            $("#volumen").prop("disabled", true);
            $("#espesor").prop("disabled", true);
        },
    });
}

function obtenerDatosModuloConValidaciones(id) {
    $.ajax({
        url: "/administrar/ObtenerModulos",
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            _datosProductos = data;
            $.each(data.Data, function (i, item) {
                if (item.idproducto == id) {
                    //TRAER LOS INPUTS DE MODULO
                    soyUnModulo();
                    console.log("entre al if del modulo y soy tipo : " + item.tipo);
                    //MOSTRAR Y OCULTAR BOTONES
                    $("#btnModificarModulo").show();
                    $("#btnModificarTanque").hide();
                    //ASIGNAR VALORES A LOS CAMPOS DE MODULO
                    $("#medida").val(item.medida);
                    $("#cantpersonas").val(item.cantpersonas);
                    $("#cantpuertas").val(item.cantpuertas);
                    $("#cantventanas").val(item.cantventanas);

                    //CONSUMIR ENDPOINT PARA EDITAR MODULO
                    $("#btnModificarModulo").click(function () {
                        consumeModificarModulo(id);
                    });
                }
            });
        },
    });
}

function editProductModulo(id) {
    $(".container").show();
    _datosProductos.Data.forEach(function (item) {
        $("#tituloAgregarNuevoProducto").hide();
        $("#tituloEditarProducto").show();
        if (item.idproducto == id) {
            moverseEditarModulo("seccionFormulario");
            $("#nombre").val(item.nombre);
            $("#descripcion").val(item.descripcion);
            $("#precio").val(item.precio);
            $("#productoModulo").hide();
            $("#labelProductoModulo").hide();
            $("#productoTanque").hide();
            $("#labelProductoTanque").hide();
            $("#btnAgregarProducto").hide();
            $("#labeltipoProducto").hide();
            obtenerDatosModuloConValidaciones(id);
        }
    });
}
function editProductTanque(id) {
    $(".container").show();
    $("#tituloAgregarNuevoProducto").hide();
    $("#tituloEditarProducto").show();
    _datosProductos.Data.forEach(function (item) {
        if (item.idproducto == id) {

            moverseEditarTanque("seccionFormulario");
            $("#nombre").val(item.nombre);
            $("#descripcion").val(item.descripcion);
            $("#precio").val(item.precio);
            $("#productoModulo").hide();
            $("#labelProductoModulo").hide();
            $("#productoTanque").hide();
            $("#labelProductoTanque").hide();
            $("#btnAgregarProducto").hide();
            $("#labeltipoProducto").hide();
            obtenerDatosTanqueConValidaciones(id);
        }
    });
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
                $("#tblProducto").append(
                    `
                        <tr>
                            <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm><div class='class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>${item.nombre}</p></div></td>

                            <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm><div class='class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>${item.descripcion}</p></div></td>
            
                            ${item.tipo == 1 ? `<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm><div class='class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>Modulo</p></div></td>` : `<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm><div class='class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>Tanque</p></div></td>`}
                            
                            <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm><div class='class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>${'Bs. ' + item.precio}</p></div></td>

                            ${item.estado == true ? `<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <span class='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span class='relative'>Activo</span>
                            </span>
                            </td>`: `<td class='px-5 py-5 bg-white text-sm'>
                            <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span aria-hidden class='absolute inset-0 bg-red-200 opacity-50 rounded-full'></span>
                            <span class="relative">Inactivo</span>
                             </span>`}

                             <td class=' py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'> 
                            <button id='btnCambiarEstado' class='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800' onclick='changeStatus(${item.idproducto})'>status</button>
                            </p></div></td>

                            <td class=' py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>
                            <button id='btnEliminar' class='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900' onclick='deleteProduct(${item.idproducto})'>Eliminar</button>
                            </p></div></td>
                            
                            ${item.tipo == 1 ? `<td class=' py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>
                            <button href='#seccionFormulario' id='btnEditar' class='text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-100' onclick='editProductModulo(${item.idproducto})'>Editar</button>
                            </p></div></td>`:
                        `<td class=' py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>
                            <button id='btnEditar' class='text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-100' onclick='editProductTanque(${item.idproducto})'>Editar</button>
                            </p></div></td>`}

                            ${item.tipo == 1 ? `<td class=' py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>
                            <button id='btnEditar' class='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onclick='verDetalleModulo(${item.idproducto})'>VER</button>
                            </p></div></td>`:
                        `<td class=' py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>
                            <button id='btnEditar' class='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onclick='verDetalleTanque(${item.idproducto})'>VER</button>
                            </p></div></td>`}

                        </tr >`);

                _datosProductos = data;
                //$("#tblProducto>tbody").append(row);
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
    $(".container").hide();
    getAllProducts();

    //OCULTAR BOTONES DE EDITAR
    $("#btnModificarTanque").hide();
    $("#btnModificarModulo").hide();

    //OCULTAR TITULOS QUE NO SE USAN
    $("#tituloEditarProducto").hide();
    $("#tituloDetalleProducto").hide();
    $("#subtitleformEmpty").hide();


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
//funcion si se toca un boton


function isTanqueOrModulo() {
    if ($("#productoModulo").prop("checked")) {
        guardarModulo();
        limpiarModulo();
    } else {
        guardarTanque();
        limpiarTanque();
    }
}


$(document).ready(function () {
    init();
    $("#btnAgregarProducto").click(function () {
        isTanqueOrModulo();
    });
    $("#closeModal").click(function () {
        $(".container").hide();
        console.log("close");
        location.reload();
    });
});
