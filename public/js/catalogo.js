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

let subtotales = 0;


/*function solicitarCotizacion() {
    //go to the page
    window.location.href = "/solicitarCotizacion/";
}*/

function AgregarAlCarrito(id) {
    /*let producto = _datosProductos.Data.find(x => x.idproducto == id);
    let _productosIDS = JSON.parse(localStorage.getItem('_productosIDS'));
    /*if (_productosIDS == null) {
        _productosIDS = [];
    }
    _productosIDS.push(producto);
    localStorage.setItem('_productosIDS', JSON.stringify(_productosIDS));
    console.log("estos son los ids que se escogieron", _productosIDS);*/

    //add to the array every time the button is clicked
    //let _productosIDS = JSON.parse(localStorage.getItem('_productosIDS'));
    let product = _datosProductos.Data.find(x => x.idproducto == id);
    _productosIDS.push(product);
    /*$.each(_productosIDS, function (i, item) {
        if (_productosIDS != null) {
            if (_productosIDS[i].idproducto == id) {
                toastr.error('El producto ya se encuentra en el carrito');
                _productosIDS = _productosIDS.filter(x => x.idproducto != id);

            }
            else {
                _productosIDS.push(product);
            }
        }
        else {
            _productosIDS.push(product);

        }

    });*/

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

    console.log("lista de lista:", list_data_d);
    console.log("subtotales:", subtotales);

    console.log("products", _productosIDS);
    console.log("list_data_d", list_data_d);
    $.each(_productosIDS, function (j, item2) {

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
            <button onclick='deleteItem(${item2.idproducto})' class='font-semibold hover:text-red-500 text-gray-500 text-xs'>Remove</button>
            </div>`:
                `<div class='flex flex-col justify-between ml-4 flex-grow'>
            <span id='nombreproducto' class='font-bold text-sm'>${item2.nombre}</span>
            <span class='text-blue-500 text-xs'>Tanque</span>
            <button onclick='deleteItem(${item2.idproducto})' class='font-semibold hover:text-red-500 text-gray-500 text-xs'>Remove</button>
            </div>`}
            </div>
            <div class="flex justify-center w-1/5">
            <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path
                d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
            <input id="cantidad${j}" class=" mx-2 border text-center w-8" type="number" value="1">
            <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path
                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
            </div>
            <span class="text-center w-1/5 font-semibold text-sm">Bs. ${item2.precio}</span>
            <span class="showSubtotal text-center w-1/5 font-semibold text-sm">BS. ${subtotales} </span>

            </div>
            </div>
    `);
        $("#addItems").html(
            `
    <h1 class='font-semibold text-2xl'>Tu solicitud</h1>
    <h2 class='font-semibold text-2xl'> ${_productosIDS.length} items</h2>
    `
        );
        $("#preciototal").html({ subtotales });
        $("#showSubtotal").html({ subtotales });

        //_datosProductos = data;
    });

}

function consumeguardarPedido() {
    const today = new Date();
    $.each(_productosIDS, function (j, item) {
        let cantidadF = $("#cantidad" + j).val();
        console.log("ids de cantidad:", cantidadF);
        list_data_d.push({
            idproducto: item.idproducto,
            cantidad: cantidadF,
            precioproducto: item.precio,
            subtotal: item.precio * cantidadF,
        });
        subtotales = subtotales + list_data_d[j].subtotal;
        console.log("subtotales:", subtotales);
    });
    console.log("lista de lista:", list_data_d);
    console.log("subtotales:", subtotales);
    _productosIDS = [...new Set(_productosIDS)];
    localStorage.setItem('_productosIDS', JSON.stringify(_productosIDS));
    console.log(_productosIDS);


    //console.log("lista de lista:", list_data_d);
    console.log("estoy guardando el pedido");
    cantidadKM = parseInt($("#kmdesdescz").val());
    precioxKM = 10;
    precioEnviot = 10 * cantidadKM;
    var url = "/pedido/guardarPedido";
    var tipo = 'POST';
    var datos = {
        "idpedido": 0,
        "fechasolicitud": today.toLocaleDateString(),
        "preciototal": subtotales + precioEnviot,
        "estado": 1,
        "kmdesdescz": cantidadKM,
        "precioenvio": 10 * cantidadKM,
        "iduser": 1,
        list_data_d: list_data_d
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
    _productosIDS = _productosIDS.filter(function (item) {
        return item.idproducto !== id;
    });
    localStorage.setItem('_productosIDS', JSON.stringify(_productosIDS));
    console.log(_productosIDS);
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


}

/*function obtenerCantidades(valor) {
    $.each(_datosProductos, function (i, item) {
        document.getElementById("cantidad" + i).value = valor;
        console.log("cantidad?:", cantidad);
        return cantidad;
    });
}*/

function showSeccionEnvios() {
    $("#checkboxEnvio").prop("checked") ? $("#showSeccionEnvios").show() : $("#showSeccionEnvios").hide();
    console.log("toque el checkbox");
}

$(document).ready(function () {
    //.showSubtotal
    $.each(_productosIDS, function (i, item) {
        var text = document.getElementById('showEnvio');
        text.addEventListener('keyup', (event) => {
            var inputText = event.path[i].value;
            document.querySelector('.showSubtotal').innerHTML = inputText;
            console.log("text:", text);

        });

    });

    init();
    getAvailableProducts();
    showSeccionEnvios();
    listarProductosCarrito();
    //obtenerCantidades();
    $("#showEnvio").hide();
    $("#generarPrecioEnvio").click(function () {
        $("#showEnvio").show();
        cantidadKilometros = parseInt($("#kmdesdescz").val());
        precioEnvio = 10 * cantidadKilometros;
        $("#showEnvio").html("Envío: Bs. " + precioEnvio);


    });
});