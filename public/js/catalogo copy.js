let _datosProductos;
let _productosIDS = JSON.parse(localStorage.getItem('_productosIDS'));
if (_productosIDS == null) {
    _productosIDS = [];
}
_productosIDS = [...new Set(_productosIDS)];

list_data_d = JSON.parse(localStorage.getItem('list_data_d'));
if (list_data_d == null) {
    list_data_d = [];
}
list_data_d = [...new Set(list_data_d)];

let lista_datitos = JSON.parse(localStorage.getItem('lista_datitos'));
if (lista_datitos == null) {
    lista_datitos = [];
}
lista_datitos = [...new Set(lista_datitos)];

let subtotales = 0;


/*function solicitarCotizacion() {
    //go to the page
    window.location.href = "/solicitarCotizacion/";
}*/

function AgregarAlCarrito(id) {

    let product = _datosProductos.Data.find(x => x.idproducto == id);
    _productosIDS.push(product);

    _productosIDS = [...new Set(_productosIDS)];
    localStorage.setItem('_productosIDS', JSON.stringify(_productosIDS));
    console.log(_productosIDS);

    //actualizar la tabla con .load()
    location.reload();
    //$("#seccion").load(" #seccion");

}


function getAvailableProducts() {
    $.ajax({
        url: "/administrar/obtenerProductos",
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            _datosProductos = data;
            $.each(data.Data, function (i, item) {
                if (item.estado == true) {
                $("#tarjeta").append(
                    `
                        <div class='bg-white p-3 shadow-md rounded-md'>
                        <h3 class='uppercase text-l text-gray-800 font-semibold mb-2'>${item.nombre}</h3>
                        <p class='mb-1'>${item.descripcion}</p>
                        <p class='my-2'>${'Bs.' + item.precio}</p>
                        <button id="btnAgregar" onclick='AgregarAlCarrito(${item.idproducto})' class='text-lg font-semibold text-gray-700 bg-indigo-100 px-4 py-1 block mx-auto rounded-md'>Agregar</button>
                        </div>`);
                _datosProductos = data;
                }
            });
            //console.log(_productosIDS);
            //console.log(_datosProductos);
        }
    });
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
        //_datosProductos = resultado.Data;
        //location.reload();
        //console.log(resultado);
        //mostrarProductos();
    } else {
        toastr.error("Ups.. algo salió mal");
    }
}

function listarProductosCarrito() {
    console.log(_productosIDS);
    $.each(_productosIDS, function (j, item2) {
        //if (item1.idproducto == item2.idproducto) {
        $("#tblCarrito").append(
            `
            <div id="seccion" class='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
            <div class="flex w-2/5">
            <div class="w-20">
            <img class="h-24" src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z" alt="">
            </div>
            ${item2.tipo == "M" ?
                `<div class='flex flex-col justify-between ml-4 flex-grow'>
            <span id='nombreproducto' class='font-bold text-sm'>${item2.nombre}</span>
            <span class='text-red-500 text-xs'>Módulo habitacional</span>
            <a onclick='deleteItem(${item2.idproducto})' class='font-semibold hover:text-red-500 text-gray-500 text-xs'>Remove</a>
            </div>`:
                `<div class='flex flex-col justify-between ml-4 flex-grow'>
            <span id='nombreproducto' class='font-bold text-sm'>${item2.nombre}</span>
            <span class='text-blue-500 text-xs'>Tanque</span>
            <a onclick='deleteItem(${item2.idproducto})' class='font-semibold hover:text-red-500 text-gray-500 text-xs'>Remove</a>
            </div>`}
            </div>
            <div class="flex justify-center w-1/5">
            <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path
                d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
            <input class="cantidad1 mx-2 border text-center w-8" type="number" value="1">
            <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path
                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
            </div>
            <span class="text-center w-1/5 font-semibold text-sm">Bs. ${item2.precio}</span>
            <span class="text-center w-1/5 font-semibold text-sm">Bs. ${item2.precio}</span>

            </div>
            </div>
    `);
        $("#addItems").html(
            `
    <h1 class='font-semibold text-2xl'>Tu solicitud</h1>
    <h2 class='font-semibold text-2xl'> ${_productosIDS.length} items</h2>
    `
        );
        html = `
    <span class='font-semibold text-sm'>Subtotal: Bs.</span>
    <span class='font-semibold text-sm uppercase>ITEMS</span>
    `;
        $("#divPrices").html(html);

        //_datosProductos = data;
        //}
    });
}

function obtenerdatitos() {

}
function consumeguardarPedido() {
    //get element by id and get value
    let cantidadF = parseInt($("#cantidad1").val());
    $.each(_productosIDS, function (j, item) {
        list_data_d.push({
            idproducto: item.idproducto,
            cantidad: 1,
            precioproducto: item.precio,
            subtotal: item.precio * 1,
        });
        subtotales = subtotales + (item.precio * 1);

    });
    console.log("lista de lista:", list_data_d);
    console.log("subtotales:", subtotales);


    _productosIDS = [...new Set(_productosIDS)];
    localStorage.setItem('_productosIDS', JSON.stringify(_productosIDS));
    console.log(_productosIDS);
    //_productosIDS = [...new Set(_productosIDS)];
    //localStorage.setItem('_productosIDS', JSON.stringify(_productosIDS));*/

    //console.log("lista de lista:", list_data_d);
    console.log("estoy guardando el pedido");
    cantidadKM = parseInt($("#kmdesdescz").val());
    precioxKM = 10;
    precioEnviot = precioxKM * cantidadKM;
    var url = "/pedido/guardarPedido";
    var tipo = 'POST';
    var datos = {
        "idpedido": 0,
        "fechasolicitud": "5/12/2022",
        "preciototal": 250,
        "estado": 1,
        "kmdesdescz": cantidadKM,
        "precioenvio": 100,
        "iduser": 1,
        list_data_d: list_data_d
        /*"list_data_d": [
            {
                "idproducto": 1,
                "cantidad": 5,
                "precioproducto": 10,
                "subtotal": 50
            },
            {
                "idproducto": 8,
                "cantidad": 5,
                "precioproducto": 10,
                "subtotal": 50
            },
            {
                "idproducto": 9,
                "cantidad": 5,
                "precioproducto": 10,
                "subtotal": 50
            }
        ]*/
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) {
        getResultadoExitoso(response);
        //location.reload();
    }, datos, tipoDatos, tipo);

}
function deleteItem(id) {
    console.log("estoy borrando el id", id);
    //clear an specific item from the array with localstorage
    let _productosIDS = JSON.parse(localStorage.getItem('_productosIDS'));
    _productosIDS = _productosIDS.filter(x => x.idproducto != id);
    localStorage.setItem('_productosIDS', JSON.stringify(_productosIDS));
    location.reload();
}

/*function consumeObtenerPedidos() {
    $.ajax({
        url: "/administrar/obtenerProductos",
        type: 'GET',
        dataType: 'JSON'
        success: function (data) {
_datosProductos = data;
$.each(data.Data, function (i, item1) {

});
}
    });
}*/

function init() {

    //localStorage.clear();
    console.log(_productosIDS);
    //console.log(list_data_d);
    $("#guardarPedido").click(function () {
        consumeguardarPedido();
    });
    $.each(_productosIDS, function (j, item) {
        lista_datitos.push({
            cantidad: 2,
            precioproducto: item.precio,
            subtotal: item.precio * 2,
            sumasubtotales: sumasubtotales + (item.precio * 2),
        });
    });
    console.log("lista de datitos:", lista_datitos);
    let tamanio = lista_datitos.length;
    console.log("tamanio:", tamanio);
    console.log("suma total subtotales:", lista_datitos[tamanio - 1].sumasubtotales);
}

function showSeccionEnvios() {
    $("#checkboxEnvio").prop("checked") ? $("#showSeccionEnvios").show() : $("#showSeccionEnvios").hide();
    console.log("toque el checkbox");
}

$(document).ready(function () {
    init();
    getAvailableProducts();
    showSeccionEnvios();
    listarProductosCarrito();
    obtenerdatitos();
});