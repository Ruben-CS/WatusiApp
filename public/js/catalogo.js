let _datosProductos;

/*function solicitarCotizacion() {
    //go to the page
    window.location.href = "/solicitarCotizacion/";
}*/



function AgregarAlCarrito(id){
    let producto = _datosProductos.Data.find(x => x.idproducto == id);
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    if(carrito == null){
        carrito = [];
    }
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(carrito);
}

function getAvailableProducts() {
    $.ajax({
        url: "/catalogo/ObtenerProductosDisponibles",
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            _datosProductos = data;
            $.each(data.Data, function (i, item) {
                $("#tarjeta").append(
                    `
                        <div class='bg-white p-6 shadow-md rounded-md'>
                        <h3 class='uppercase text-xl text-gray-800 font-semibold mb-3'>${item.nombre}</h3>
                        <p class='mb-2'>${item.descripcion}</p>
                        <p class='my-4'>${'Bs.' + item.precio}</p>
                        <button onclick='AgregarAlCarrito(${item.idproducto})' class='text-lg font-semibold text-gray-700 bg-indigo-100 px-4 py-1 block mx-auto rounded-md'>Agregar</button>
                        </div>`);
                _datosProductos = data;
            });
            console.log(_datosProductos);
        }
    });
}

$(document).ready(function () {
    getAvailableProducts();
});